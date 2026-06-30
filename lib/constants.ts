// ============================================
// PORTFOLIO CONTENT — All production-ready copy
// Source: 05_CONTENT_MASTER.md (part5.docx)
// ============================================

export const SITE_CONFIG = {
  name: "Abhiraj Govind",
  title: "Abhiraj Govind | AI/ML Engineer | LLM Engineer | Machine Learning Portfolio",
  description:
    "AI/ML Engineer specializing in Large Language Models, Deep Learning, Retrieval-Augmented Generation, and Production AI Systems. Explore projects, research, engineering notebooks, and technical case studies.",
  url: "https://abhirajgovind.dev",
  tagline: "Engineering Intelligence. Building Reliable AI Systems.",
  motto: "Research. Engineer. Evaluate. Improve. Repeat.",
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
  name: "ABHIRAJ GOVIND",
  titles: [
    "AI/ML Engineer",
    "LLM Engineer",
    "Applied AI Engineer",
    "Machine Learning Researcher",
    "Production AI Engineer",
  ],
  description:
    "I build intelligent systems that transform research into scalable production AI. My work spans Large Language Models, Retrieval-Augmented Generation, Deep Learning, and evaluation pipelines designed for reliable real-world deployment.",
  cta: {
    primary: { label: "Explore My Work", href: "#projects" },
    secondary: { label: "Download Resume", href: "/resume.pdf" },
  },
  typingTexts: [
    "Building Intelligent Systems...",
    "Training Neural Networks...",
    "Engineering LLM Pipelines...",
    "Deploying AI Applications...",
    "Designing Multi-Agent Systems...",
    "Scaling Machine Learning...",
    "Optimizing Inference...",
    "Creating RAG Architectures...",
    "Building Production AI...",
  ],
  techBadges: [
    "Python",
    "PyTorch",
    "TensorFlow",
    "Transformers",
    "RAG",
    "Docker",
    "AWS",
    "Azure",
    "LLMs",
    "Scikit-Learn",
  ],
  loadingMessages: [
    "Initializing Neural Network...",
    "Loading Transformer Weights...",
    "Building Knowledge Graph...",
    "Optimizing Inference Pipeline...",
    "Embedding Intelligence...",
    "Launching Portfolio...",
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
  stats: [
    { value: "2+", label: "Years Building AI" },
    { value: "20+", label: "Technologies" },
    { value: "3+", label: "Major AI Projects" },
    { value: "1", label: "Research Publication" },
    { value: "1000+", label: "Hours Learning AI" },
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
    { emoji: "⚡", title: "Automated Evaluation Pipeline", description: "Reduced manual experimentation. Improved benchmarking efficiency." },
    { emoji: "🧠", title: "AST-Based Dataset Engineering", description: "Improved preprocessing quality. Enabled scalable evaluation." },
    { emoji: "🐳", title: "Dockerized Benchmarking", description: "Portable. Reproducible. Production-ready." },
  ],
};

export const PROJECTS = [
  {
    id: "rag",
    title: "Multi-Modal RAG System",
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

export const RESEARCH = {
  publication: {
    title: "Adversarial Machine Learning for Security",
    summary:
      "Explores adversarial attacks against machine learning models and discusses defensive strategies for improving robustness. The research investigates vulnerabilities introduced through adversarial examples and emphasizes the importance of secure AI system design.",
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
  social: {
    github: "https://github.com/abhirajgovind",
    linkedin: "https://linkedin.com/in/abhirajgovind",
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

export const ROADMAP = {
  shortTerm: ["Advanced RAG", "LLM Evaluation", "Graph RAG", "Production MLOps", "Inference Optimization"],
  midTerm: ["AI Agents", "Vision-Language Models", "Distributed Training", "CUDA Programming", "Model Compression"],
  longTerm: ["Foundation Models", "AI Research", "Open Source Leadership", "Scalable AI Infrastructure", "Technical Leadership"],
};
