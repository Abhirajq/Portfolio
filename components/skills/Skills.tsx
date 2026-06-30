"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Brain,
  Sparkles,
  Database,
  Server,
  Cloud,
} from "lucide-react";
import { SKILLS } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// ============================================
// SKILL DESCRIPTIONS DICTIONARY
// ============================================
const SKILL_DESCRIPTIONS: Record<string, string> = {
  // Languages
  "Python": "Primary language used for model development, data engineering, validation pipelines, and ML infrastructure.",
  "SQL": "Querying relational databases, optimizing complex data joins, and retrieving data for statistical analysis.",
  "C++": "High-performance programming, custom algorithm design, and resource-constrained execution layers.",
  "TypeScript": "Building type-safe frontend UI components, responsive layout systems, and custom web apps.",
  
  // Machine Learning
  "Scikit-Learn": "Implementing classification, regression, clustering, model validation pipelines, and data preprocessing.",
  "PyTorch": "Deep learning framework used for custom neural architectures, loss functions, optimization, and evaluation.",
  "TensorFlow": "Building neural network models, production deployment schemas, and hardware-accelerated training.",
  "Feature Engineering": "Selecting, transforming, scaling, and combining raw features to maximize model performance.",
  "Model Evaluation": "Assessing generalization via cross-validation, precision, recall, F1-score, and ROC-AUC metrics.",
  
  // LLMs & Deep Learning
  "Transformers": "Working with self-attention layers, HuggingFace models, tokenizers, and custom model architectures.",
  "Prompt Engineering": "Optimizing systemic prompt instructions, few-shot structures, output schemas, and agent constraints.",
  "RAG": "Retrieval-Augmented Generation using dense retrievers, vector indices, document chunking, and LLM context synthesis.",
  "Embeddings": "Dense vector representations of text, code, or images used for semantic similarity checks and search.",
  "Vector Search": "High-speed semantic search lookup of dense vectors using algorithms like HNSW, Cosine, or L2 distance.",
  "Inference Optimization": "Reducing latency using quantization (INT8, FP16), KV caching, batching, and model pruning.",

  // Data Engineering
  "Pandas": "Structuring, cleaning, filtering, merging, and aggregating multi-dimensional tabular datasets.",
  "NumPy": "High-performance vector operations, mathematical computations, and matrix algebra.",
  "Matplotlib": "Plotting distribution graphs, training history histories, and custom statistical charts.",
  "Data Cleaning": "Handling outliers, imputing missing data records, and formatting raw input logs.",
  "ETL": "Extracting, transforming, and loading high-volume pipeline data into structured storehouses.",
  "Dataset Engineering": "Building AST parsers and automating large-scale dataset creation and filtering for evaluation.",

  // Backend
  "Flask": "Lightweight API framework for microservices, model serving endpoints, and rapid prototypes.",
  "Django": "Production-ready MVC framework for robust user management, database schemas, and backends.",
  "REST APIs": "Designing clean HTTP endpoints, validation layers, status returns, and serialized payloads.",

  // Cloud & DevOps
  "AWS": "Deploying machine learning models, utilizing EC2 compute, and S3 data storage buckets.",
  "Azure": "Cloud resources, container instances, VM provisioning, and machine learning hosting.",
  "Docker": "Creating consistent, isolated container configurations for reproducible model hosting.",
  "Git": "Version control, branching strategies, collaborative development, and release tracking."
};

// ============================================
// SKILLS RADAR DATA
// ============================================
const radarData = [
  { subject: "AI Engineering", value: 92, fullMark: 100 },
  { subject: "Machine Learning", value: 88, fullMark: 100 },
  { subject: "Deep Learning", value: 85, fullMark: 100 },
  { subject: "Python Stack", value: 95, fullMark: 100 },
  { subject: "Cloud & Ops", value: 80, fullMark: 100 },
  { subject: "Data Pipelines", value: 90, fullMark: 100 },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    setMounted(true);
  }, []);

  // Auto-select the first skill of the active category on load/tab switch
  useEffect(() => {
    if (SKILLS.categories[activeCategory]) {
      setSelectedSkill(SKILLS.categories[activeCategory].skills[0]);
    }
  }, [activeCategory]);

  const iconMap: Record<string, any> = {
    Code: Code,
    Brain: Brain,
    Sparkles: Sparkles,
    Database: Database,
    Server: Server,
    Cloud: Cloud,
  };

  return (
    <section id="skills" className="py-20 relative bg-bg-secondary/10">
      <div className="section-container relative z-10">
        <SectionHeader
          label="Skills"
          title="Technical Expertise"
          subtitle="Interactive mapping of machine learning competencies, backend architectures, and tools."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Left Column — Interactive Skill Matrix */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.categories.map((cat, idx) => {
                const IconComponent = iconMap[cat.icon] || Code;
                const isActive = activeCategory === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveCategory(idx)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-white/5 border-white/10 glow-blue scale-[1.02]"
                        : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl ${isActive ? "text-electric-blue bg-electric-blue/10" : "text-text-muted bg-white/5"}`}>
                        <IconComponent size={18} />
                      </div>
                      <h4 className="font-bold text-text-primary text-sm font-[family-name:var(--font-heading)]">
                        {cat.name}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 text-[10px] rounded-full bg-white/5 border border-white/5 text-text-secondary"
                        >
                          {s}
                        </span>
                      ))}
                      {cat.skills.length > 3 && (
                        <span className="px-2 py-0.5 text-[9px] rounded-full bg-white/10 text-text-muted">
                          +{cat.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Display active category details */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 glass rounded-[24px] border border-white/10 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-text-muted mb-4 font-[family-name:var(--font-heading)]">
                  Active Matrix Block: {SKILLS.categories[activeCategory].name}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {SKILLS.categories[activeCategory].skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setSelectedSkill(skill)}
                      onMouseEnter={() => setSelectedSkill(skill)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                        selectedSkill === skill
                          ? "bg-electric-blue/20 border-electric-blue/50 text-text-primary shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                          : "bg-white/5 border-white/5 text-text-secondary hover:border-white/15 hover:bg-white/10 hover:text-text-primary"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Skill Explanation Box */}
              <AnimatePresence mode="wait">
                {selectedSkill && (
                  <motion.div
                    key={selectedSkill}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="mt-6 pt-4 border-t border-white/5"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-electric-blue font-bold font-[family-name:var(--font-code)]">
                      Skill Overview
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed mt-1">
                      <strong className="text-text-primary">{selectedSkill}</strong>: {SKILL_DESCRIPTIONS[selectedSkill] || "Engineering skill competency."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column — Skill Radar Chart */}
          <div className="lg:col-span-5 flex justify-center">
            <GlowCard hover={false} glowColor="cyan" className="w-full max-w-sm flex flex-col items-center">
              <div className="border-b border-white/5 pb-4 mb-6 w-full text-center">
                <h4 className="text-sm font-semibold font-[family-name:var(--font-heading)] text-text-primary">
                  AI Competency Radar
                </h4>
                <p className="text-xxs text-text-muted mt-1">
                  Proficiency index based on research, internship, and project output
                </p>
              </div>

              {mounted && (
                <div className="w-full h-64 flex items-center justify-center font-[family-name:var(--font-code)]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                      <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.4)" fontSize={9} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.1)" fontSize={8} />
                      <Radar
                        name="Competency"
                        dataKey="value"
                        stroke="#06B6D4"
                        fill="#06B6D4"
                        fillOpacity={0.15}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
