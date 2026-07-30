// ============================================
// PORTFOLIO CONTENT — All production-ready copy
// ============================================
//
// ⚠️  FIELDS AWAITING REAL DATA
//     Every field below that is an empty string ("") is wired into the UI but
//     renders nothing until you fill it in — no dead buttons, no placeholder
//     text ships to production. Search this file for `""` to find them all:
//
//       PROJECTS[].links.github / .demo / .writeup   → project CTA buttons
//       PROJECTS[].evidence                          → metric baseline caption
//       RESEARCH.publication.url                     → "Read the paper" button
//       RESEARCH.publication.venue / .authors        → publication byline
//       EXPERIENCE.achievements[].metric             → quantified impact badge
//
// ============================================

export const SITE_CONFIG = {
  name: "Abhiraj Govind",
  title: "Abhiraj Govind | AI/ML Engineer | LLM Engineer | Machine Learning Portfolio",
  description:
    "AI/ML Engineer specializing in Large Language Models, Deep Learning, Retrieval-Augmented Generation, and Production AI Systems. Explore projects, research, engineering notebooks, and technical case studies.",
  // Set NEXT_PUBLIC_SITE_URL in your host's env so preview/production deploys
  // emit correct canonical, sitemap, robots and Open Graph URLs.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://abhirajgovind.dev",
  tagline: "Engineering Intelligence. Building Reliable AI Systems.",
  motto: "Research. Engineer. Evaluate. Improve. Repeat.",
  resume: "/resume.pdf",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  name: "Abhiraj Govind",
  role: "AI / ML Engineer",
  headline: { lead: "I Build", accent: "Intelligent", trail: "AI Systems." },
  subtext: "PyTorch · TensorFlow · LLMs · RAG — from research to production.",
  techStack: ["PyTorch", "TensorFlow", "Docker", "LLMs", "RAG", "AWS"],
  // Lucide icon names — OS emoji rendered inconsistently across platforms and
  // clashed with the crisp icon set used everywhere else on the page.
  features: [
    { icon: "Brain", label: "LLM Engineering" },
    { icon: "Search", label: "RAG Systems" },
    { icon: "AudioLines", label: "Audio ML" },
    { icon: "FileText", label: "Research" },
  ],
};

export const ABOUT = {
  heading: "Engineering AI Systems with Curiosity, Precision, and Impact",
  paragraphs: [
    "I'm an AI/ML Engineer passionate about building intelligent systems that solve meaningful problems.",
    "My interests lie at the intersection of Machine Learning, Large Language Models, Deep Learning, and scalable AI engineering.",
    "I enjoy designing end-to-end AI pipelines—from dataset preparation and feature engineering to model evaluation, benchmarking, and deployment. I believe successful AI systems require more than high-performing models; they demand reproducibility, maintainability, thoughtful architecture, and continuous evaluation.",
    "Currently, as an LLM Post-Training Intern at Ethara AI, I work on benchmarking workflows, dataset engineering, automated evaluation pipelines, and production-oriented machine learning infrastructure.",
    "My long-term goal is to contribute to foundation models, multimodal AI, and research-driven products that make artificial intelligence more useful, reliable, and accessible.",
  ],
  principles: [
    {
      title: "Research Before Implementation",
      description: "Read papers. Understand the problem. Build the correct solution.",
      icon: "BookOpen",
    },
    {
      title: "Measure Everything",
      description: "Every experiment should produce measurable insights.",
      icon: "BarChart3",
    },
    {
      title: "Design Systems, Not Scripts",
      description: "Engineering should scale. Automation matters.",
      icon: "Layers",
    },
    {
      title: "Reproducibility",
      description: "Experiments should be repeatable. Models should be benchmarked consistently.",
      icon: "RefreshCw",
    },
    {
      title: "Continuous Learning",
      description: "The AI landscape evolves rapidly. Learning never stops.",
      icon: "TrendingUp",
    },
  ],
};

export const EXPERIENCE = {
  company: "Ethara AI",
  role: "LLM Post-Training Intern",
  // ISO start date — the "N mos" figures shown in the hero and About section are
  // derived from this on the server, so they never go stale or disagree.
  startDate: "2026-01-01",
  duration: "Jan 2026 - Present",
  description:
    "Working on production-oriented workflows for evaluating and improving Large Language Models.",
  details:
    "My work focuses on building scalable benchmarking pipelines, preprocessing large datasets, automating evaluation workflows, and improving experimentation efficiency using Docker and engineering best practices.",
  modules: [
    {
      title: "LLM Evaluation",
      description: "Benchmark creation, evaluation methodology, testing, and performance analysis.",
      icon: "Brain",
    },
    {
      title: "Dataset Engineering",
      description: "Cleaning, preprocessing, AST parsing, automation, and quality improvement.",
      icon: "Database",
    },
    {
      title: "Benchmarking",
      description: "Docker, automation, parallel execution, evaluation framework, and performance optimization.",
      icon: "Gauge",
    },
    {
      title: "Engineering Collaboration",
      description: "Cross-functional teams, research engineers, code reviews, and experiment validation.",
      icon: "Users",
    },
  ],
  achievements: [
    {
      emoji: "⚡",
      title: "Automated Evaluation Pipeline",
      description: "Replaced manual experiment runs with a scheduled, reproducible benchmark harness.",
      // e.g. "12h → 40min per sweep" — renders as a highlighted figure when set.
      metric: "",
    },
    {
      emoji: "🧠",
      title: "AST-Based Dataset Engineering",
      description: "Parsed and filtered source data programmatically to raise evaluation set quality.",
      // e.g. "40k samples processed"
      metric: "",
    },
    {
      emoji: "🐳",
      title: "Dockerized Benchmarking",
      description: "Containerised the evaluation stack for portable, reproducible runs.",
      // e.g. "8 models benchmarked"
      metric: "",
    },
  ],
};

export const PROJECTS = [
  {
    id: "rag",
    title: "Multi-Modal RAG System",
    category: "Retrieval-Augmented Generation",
    tagline: "Retrieval-Augmented Generation powered by semantic search, embeddings, and multimodal intelligence.",
    overview:
      "Designed and developed a production-inspired Multi-Modal Retrieval-Augmented Generation system capable of understanding both textual and visual information. The system combines embeddings, vector databases, semantic retrieval, and transformer-based language models to deliver highly relevant responses with low latency.",
    problem: [
      "Traditional keyword search struggles with large knowledge bases and multimodal content.",
      "Users require contextual answers rather than document retrieval.",
    ],
    solution: [
      "Implemented a RAG pipeline using vector embeddings, semantic search, document chunking, and transformer-based language models.",
      "Optimized retrieval quality while maintaining sub-second response latency.",
    ],
    metrics: [
      { value: "22%", label: "Retrieval Improvement" },
      { value: "<1s", label: "Response Latency" },
      { value: "✓", label: "Vector Search" },
      { value: "✓", label: "Hybrid Retrieval" },
    ],
    // A metric with no denominator reads as a guess. One line naming the
    // baseline, dataset and measure turns these numbers into evidence.
    // e.g. "Recall@5 vs. a BM25 baseline over a 1.2k-document corpus; latency measured p95, local inference."
    evidence: "",
    links: {
      github: "",
      demo: "",
      writeup: "",
    },
    techStack: ["Python", "PyTorch", "LangChain", "Transformers", "FAISS", "Docker", "FastAPI", "Git"],
    pipeline: ["PDF/Images", "Document Loader", "Embedding Model", "Vector Database", "Retriever", "LLM", "Generated Response"],
    lessons: [
      "Embedding quality significantly affects retrieval performance.",
      "Chunking strategy influences response quality.",
      "Metadata filtering improves contextual precision.",
      "Prompt engineering remains an important optimization layer.",
    ],
    color: "blue",
  },
  {
    id: "audio-deepfake",
    title: "Audio Deepfake Detection",
    category: "Audio Classification",
    tagline: "Deep Learning for robust synthetic audio detection.",
    overview:
      "Built a hybrid CNN-LSTM architecture for detecting manipulated audio using spectrograms and MFCC features. The objective was to identify deepfake speech with high accuracy while maintaining robust generalization across varying audio conditions.",
    problem: [
      "Synthetic audio generation has become increasingly realistic.",
      "Reliable automated detection is critical for security and misinformation prevention.",
    ],
    solution: [
      "Combined convolutional feature extraction with sequential temporal modeling.",
      "Used MFCCs, spectrogram representations, and feature engineering to improve classification performance.",
    ],
    metrics: [
      { value: "91%", label: "Classification Accuracy" },
      { value: "CNN+LSTM", label: "Hybrid Architecture" },
      { value: "MFCC", label: "Feature Extraction" },
      { value: "✓", label: "Spectrogram Analysis" },
    ],
    // e.g. "Accuracy on a held-out balanced split of <dataset name>; 25 epochs, Adam, batch 32."
    evidence: "",
    links: {
      github: "",
      demo: "",
      writeup: "",
    },
    techStack: ["Python", "PyTorch", "TensorFlow", "Librosa", "NumPy", "Matplotlib", "Scikit-Learn"],
    pipeline: ["Audio Input", "Noise Reduction", "MFCC Extraction", "Spectrogram", "CNN", "LSTM", "Classification"],
    lessons: [
      "Feature engineering remains valuable even in deep learning.",
      "Model evaluation is as important as training.",
      "Balanced datasets significantly improve robustness.",
    ],
    color: "purple",
  },
];

export const SKILLS = {
  categories: [
    {
      name: "Languages",
      skills: ["Python", "SQL", "C++", "TypeScript"],
      icon: "Code",
    },
    {
      name: "Machine Learning",
      skills: ["Scikit-Learn", "PyTorch", "TensorFlow", "Feature Engineering", "Model Evaluation"],
      icon: "Brain",
    },
    {
      name: "LLMs & Deep Learning",
      skills: ["Transformers", "Prompt Engineering", "RAG", "Embeddings", "Vector Search", "Inference Optimization"],
      icon: "Sparkles",
    },
    {
      name: "Data Engineering",
      skills: ["Pandas", "NumPy", "Matplotlib", "Data Cleaning", "ETL", "Dataset Engineering"],
      icon: "Database",
    },
    {
      name: "Backend",
      skills: ["Flask", "Django", "REST APIs"],
      icon: "Server",
    },
    {
      name: "Cloud & DevOps",
      skills: ["AWS", "Azure", "Docker", "Git"],
      icon: "Cloud",
    },
  ],
};

// Replaces the self-rated competency radar. Self-assigned proficiency scores
// carry no information for a technical reader; where a skill was actually
// applied does.
export const SKILL_EVIDENCE = [
  {
    area: "LLM Evaluation & Post-Training",
    where: "Ethara AI internship",
    detail: "Benchmark harness design, automated eval runs, and result analysis on production models.",
    icon: "Brain",
  },
  {
    area: "Retrieval-Augmented Generation",
    where: "Multi-Modal RAG System",
    detail: "Chunking strategy, embedding selection, vector indexing, and hybrid retrieval.",
    icon: "Sparkles",
  },
  {
    area: "Deep Learning Architectures",
    where: "Audio Deepfake Detection",
    detail: "Hybrid CNN-LSTM built end to end: feature extraction, training loop, evaluation.",
    icon: "Layers",
  },
  {
    area: "Reproducible ML Infrastructure",
    where: "Ethara AI internship",
    detail: "Dockerised evaluation stack and AST-driven dataset pipelines built for repeat runs.",
    icon: "Database",
  },
  {
    area: "Adversarial Robustness",
    where: "Research publication",
    detail: "Attack surfaces against ML models and the defensive strategies that mitigate them.",
    icon: "ShieldCheck",
  },
];

export const RESEARCH = {
  publication: {
    title: "Adversarial Machine Learning for Security",
    summary:
      "Explores adversarial attacks against machine learning models and discusses defensive strategies for improving robustness. The research investigates vulnerabilities introduced through adversarial examples and emphasizes the importance of secure AI system design.",
    // Fill these in — the byline and "Read the paper" button only render when set.
    authors: "",
    venue: "",
    year: "2024",
    url: "",
  },
  interests: [
    "Large Language Models",
    "AI Safety",
    "Adversarial Machine Learning",
    "Retrieval-Augmented Generation",
    "Multimodal AI",
    "Responsible AI",
    "AI Evaluation",
    "Foundation Models",
    "Agentic AI",
  ],
  // Papers chosen to match the LLM-evaluation and adversarial-ML work above,
  // rather than the universally-read canon. Rewrite `takeaway` in your own
  // voice — that line is what shows you actually read the paper.
  reading: [
    {
      title: "Lost in the Middle: How Language Models Use Long Contexts",
      authors: "Liu et al.",
      year: "2023",
      takeaway:
        "Accuracy drops sharply when the relevant passage sits mid-context. A strong argument for reranking over simply widening the context window.",
    },
    {
      title: "Self-RAG: Learning to Retrieve, Generate and Critique through Self-Reflection",
      authors: "Asai et al.",
      year: "2023",
      takeaway:
        "Treats retrieval as a decision the model makes rather than a fixed preprocessing step — reframes the pipeline as control flow, not a pipeline.",
    },
    {
      title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena",
      authors: "Zheng et al.",
      year: "2023",
      takeaway:
        "Quantifies position and verbosity bias in LLM judges. Required reading before trusting any automated evaluation score.",
    },
    {
      title: "Universal and Transferable Adversarial Attacks on Aligned Language Models",
      authors: "Zou et al.",
      year: "2023",
      takeaway:
        "Gradient-optimised adversarial suffixes transfer across model families, which undercuts prompt-level safety filtering as a defence.",
    },
  ],
};

export const CONTACT = {
  heading: "Let's Build Intelligent Systems Together",
  message:
    "I'm always excited to collaborate on challenging problems involving Machine Learning, Large Language Models, Deep Learning, and Production AI Systems.",
  submessage:
    "Whether you're building the next generation of AI products or conducting cutting-edge research, I'd love to connect.",
  availability: [
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM Engineer",
    "Applied AI Engineer",
    "Research Engineer",
    "Generative AI Engineer",
  ],
  faqs: [
    {
      q: "What roles are you looking for?",
      a: "I am actively seeking AI Engineer, Machine Learning Engineer, LLM Engineer, Applied AI, or Research Engineer roles.",
    },
    {
      q: "Which AI domains interest you most?",
      a: "Large Language Models (post-training, prompt engineering, RAG pipelines), Audio Deepfake detection, and adversarial robustness/AI Safety.",
    },
    {
      q: "Are you open to relocation?",
      a: "Yes, I am open to Remote, Hybrid, and onsite relocation based on the opportunity.",
    },
  ],
  social: {
    github: "https://github.com/Abhirajq",
    linkedin: "https://www.linkedin.com/in/abhiraj-govind-574ba3214",
    email: "abhirajg67@gmail.com",
  },
};

export const FOOTER = {
  quotes: [
    "Engineering Intelligence.",
    "Building Systems That Learn.",
    "Research Meets Production.",
    "Measure. Improve. Repeat.",
    "Machine Learning Beyond Models.",
    "Design. Build. Optimize.",
  ],
};
