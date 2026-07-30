"use client";

import { useEffect, useRef, useState } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  NormalBlending,
  Points,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

/**
 * A 3D reconstruction of the portrait, rendered as a point cloud.
 *
 * There is no rigged model here and no external asset: the source photo is
 * drawn to an offscreen canvas, sampled on a grid, and each surviving pixel
 * becomes a vertex. Depth comes from luminance — brighter pixels sit forward —
 * which gives a real relief rather than a flat plane of dots.
 *
 * Two filters shape the silhouette:
 *   - a luminance ceiling drops the light studio backdrop
 *   - a circular mask with a soft edge keeps it a portrait bust
 */

const SOURCE_SIZE = 230; // square sampling grid, not display resolution
const SAMPLE_STEP = 1; // every Nth pixel on both axes
const BACKDROP_LUMA = 0.78; // above this is treated as studio backdrop
const DEPTH = 40; // z spread, in the same units as x/y
// The source photo is a tall portrait; crop a square biased toward the face
// rather than the geometric centre, which would sit on the chest.
const FACE_BIAS = 0.14;
// Fraction of the frame to keep. Tighter than 1 so the face fills the disc
// rather than sitting small inside a head-and-shoulders crop.
const FACE_ZOOM = 0.92;

// Points are recoloured onto the site palette instead of keeping raw photo
// colour. Photo tones are dark — invisible on the dark theme — whereas these
// mid-luminance accents read against both backgrounds.
const SHADOW_TONE = new Color("#4338ca");
const HIGHLIGHT_TONE = new Color("#22d3ee");
const PHOTO_MIX = 0.25; // how much original colour to retain

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uMotion;
  attribute vec3 aColor;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    vColor = aColor;

    vec3 p = position;
    // Gentle, non-uniform drift so the cloud reads as alive rather than a
    // static mesh. uMotion is 0 when the visitor asks for reduced motion.
    float wave = sin(p.x * 0.05 + uTime * 0.9 + aSeed * 6.28) * 1.6
               + cos(p.y * 0.045 + uTime * 0.7) * 1.6;
    p.z += wave * uMotion;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    // Points nearer the camera are bigger and brighter — cheap depth cueing.
    vFade = smoothstep(-140.0, 40.0, mv.z);
    gl_PointSize = uSize * (300.0 / -mv.z) * (0.75 + vFade * 0.5);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    // Round off the square point sprite.
    vec2 uv = gl_PointCoord - 0.5;
    float d = dot(uv, uv);
    if (d > 0.25) discard;

    float edge = 1.0 - smoothstep(0.16, 0.25, d);
    gl_FragColor = vec4(vColor, uOpacity * edge * (0.6 + vFade * 0.4));
  }
`;

interface PortraitCloudProps {
  src: string;
  /** Rendered if WebGL is unavailable or the image can't be read. */
  fallback: React.ReactNode;
  className?: string;
}

export default function PortraitCloud({ src, fallback, className }: PortraitCloudProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let frame = 0;
    let renderer: WebGLRenderer | null = null;
    let geometry: BufferGeometry | null = null;
    let material: ShaderMaterial | null = null;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Pointer parallax targets, in radians.
    const pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.6;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.4;
    };

    const build = (image: HTMLImageElement) => {
      if (disposed) return;

      const width = SOURCE_SIZE;
      const height = SOURCE_SIZE;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return setFailed(true);

      // Square crop from the source, offset upward so the face lands centre.
      const side = Math.min(image.naturalWidth, image.naturalHeight) * FACE_ZOOM;
      const sx = (image.naturalWidth - side) / 2;
      const sy = (image.naturalHeight - side) * FACE_BIAS;
      ctx.drawImage(image, sx, sy, side, side, 0, 0, width, height);

      let pixels: Uint8ClampedArray;
      try {
        pixels = ctx.getImageData(0, 0, width, height).data;
      } catch {
        // Tainted canvas (cross-origin image) — fall back to the flat photo.
        return setFailed(true);
      }

      const positions: number[] = [];
      const colors: number[] = [];
      const seeds: number[] = [];

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.52;

      for (let y = 0; y < height; y += SAMPLE_STEP) {
        for (let x = 0; x < width; x += SAMPLE_STEP) {
          const i = (y * width + x) * 4;
          const r = pixels[i] / 255;
          const g = pixels[i + 1] / 255;
          const b = pixels[i + 2] / 255;
          const luma = 0.299 * r + 0.587 * g + 0.114 * b;

          if (luma > BACKDROP_LUMA) continue;

          const dx = (x - cx) / radius;
          const dy = (y - cy) / radius;
          const dist = dx * dx + dy * dy;
          if (dist > 1) continue;
          // Thin the cloud toward the edge so the circle doesn't end abruptly.
          if (dist > 0.62 && Math.random() < (dist - 0.62) / 0.38) continue;

          positions.push(x - cx, -(y - cy), (luma - 0.45) * DEPTH);

          // Ramp shadow → highlight across the portrait's tonal range, then
          // let a little of the original colour back in for warmth.
          const t = Math.min(1, Math.max(0, (luma - 0.12) / 0.5));
          const tone = SHADOW_TONE.clone().lerp(HIGHLIGHT_TONE, t * t * (3 - 2 * t));
          colors.push(
            tone.r * (1 - PHOTO_MIX) + r * PHOTO_MIX,
            tone.g * (1 - PHOTO_MIX) + g * PHOTO_MIX,
            tone.b * (1 - PHOTO_MIX) + b * PHOTO_MIX,
          );
          seeds.push(Math.random());
        }
      }

      if (positions.length === 0) return setFailed(true);

      // Recentre on the actual centroid — the silhouette is not symmetric
      // within the crop, so drawing it around the image centre sits it off to
      // one side of the circle.
      let sumX = 0;
      let sumY = 0;
      const count = positions.length / 3;
      for (let i = 0; i < positions.length; i += 3) {
        sumX += positions[i];
        sumY += positions[i + 1];
      }
      const meanX = sumX / count;
      const meanY = sumY / count;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] -= meanX;
        positions[i + 1] -= meanY;
      }

      const scene = new Scene();
      const camera = new PerspectiveCamera(45, 1, 1, 1000);
      camera.position.z = 232;

      geometry = new BufferGeometry();
      geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
      geometry.setAttribute("aColor", new BufferAttribute(new Float32Array(colors), 3));
      geometry.setAttribute("aSeed", new BufferAttribute(new Float32Array(seeds), 1));

      const pixelRatio = Math.min(window.devicePixelRatio, 2);

      material = new ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        // Additive blending only adds light, so it is invisible against the
        // light theme's near-white background. Normal blending reads on both.
        blending: NormalBlending,
        uniforms: {
          uTime: { value: 0 },
          // gl_PointSize is in framebuffer pixels, so it has to scale with DPR
          // or points render at half size on retina displays.
          uSize: { value: 1.65 * pixelRatio },
          uMotion: { value: reducedMotion ? 0 : 1 },
          uOpacity: { value: 1 },
        },
      });

      const points = new Points(geometry, material);
      scene.add(points);

      try {
        renderer = new WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return setFailed(true);
      }
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(pixelRatio);
      host.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      const resize = () => {
        if (!renderer) return;
        const { clientWidth, clientHeight } = host;
        if (!clientWidth || !clientHeight) return;
        renderer.setSize(clientWidth, clientHeight, false);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
      };
      resize();

      const observer = new ResizeObserver(resize);
      observer.observe(host);
      host.addEventListener("pointermove", onPointerMove);

      const start = performance.now();
      const tick = () => {
        if (disposed || !renderer || !material) return;
        const t = (performance.now() - start) / 1000;
        material.uniforms.uTime.value = t;

        // Ease toward the pointer; idle sway keeps it moving without one.
        const idle = reducedMotion ? 0 : Math.sin(t * 0.35) * 0.12;
        current.x += (pointer.x + idle - current.x) * 0.05;
        current.y += (pointer.y - current.y) * 0.05;
        points.rotation.y = current.x;
        points.rotation.x = current.y;

        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };
      tick();

      cleanupExtras = () => {
        observer.disconnect();
        host.removeEventListener("pointermove", onPointerMove);
      };
    };

    let cleanupExtras: (() => void) | null = null;

    const image = new Image();
    image.decoding = "async";
    image.src = src;
    image.onload = () => build(image);
    image.onerror = () => setFailed(true);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cleanupExtras?.();
      geometry?.dispose();
      material?.dispose();
      if (renderer) {
        renderer.domElement.remove();
        renderer.dispose();
      }
    };
  }, [src]);

  if (failed) return <>{fallback}</>;

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
