import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas";
import { CONTACT } from "@/lib/constants";

// Sending mail is a side effect — never prerender or cache this.
export const dynamic = "force-dynamic";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Best-effort in-process throttle. Serverless instances are ephemeral so this
// is not a hard guarantee, but combined with the honeypot it stops casual spam.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5_000) hits.clear();

  return recent.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages in a short window. Please try again in a minute." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some fields need attention. Please check the form and try again." },
      { status: 400 },
    );
  }

  const { name, email, company, subject, message, website } = parsed.data;

  // Honeypot tripped: report success so the bot moves on, but send nothing.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || CONTACT.social.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  // Fail loudly rather than showing a fake success screen. The client turns
  // this into a "email me directly" fallback with a working mailto link.
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "The contact form isn't configured yet. Please email me directly.",
        fallbackEmail: to,
      },
      { status: 503 },
    );
  }

  const html = `
    <h2>New portfolio message</h2>
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // So hitting "Reply" in your inbox goes straight back to the sender.
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Resend rejected the message:", response.status, detail);
      return NextResponse.json(
        { error: "Message could not be sent. Please email me directly.", fallbackEmail: to },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json(
      { error: "Message could not be sent. Please email me directly.", fallbackEmail: to },
      { status: 502 },
    );
  }
}
