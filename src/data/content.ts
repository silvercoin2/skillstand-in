/**
 * Static marketing copy (PRD §5-§18). Kept out of JSX so a CMS can replace
 * it later without touching components.
 */
import {
  BrainCircuitIcon,
  ClipboardCheckIcon,
  Code2Icon,
  ScanSearchIcon,
  ShieldCheckIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const hero = {
  eyebrow: "Software Engineering × AI Training",
  title: "Human Engineering Expertise for Better AI",
  description:
    "Skill Stand In brings experienced software engineers and technical specialists into AI training, evaluation, coding, and human-feedback projects.",
  primaryCta: "Work With Us",
  secondaryCta: "Join Our Engineering Network",
  tertiaryCta: "See How It Works",
  flow: [
    "Engineers",
    "Skill Stand In",
    "AI Training",
    "Evaluation",
    "Human Feedback",
    "Better Models",
  ],
} as const;

export const marquee = {
  heading: "Working Across the AI Training Ecosystem",
  description:
    "Our engineers contribute their expertise across leading AI training, evaluation, and human-data platforms.",
} as const;

export const whatWeDo: { heading: string; items: FeatureItem[] } = {
  heading: "Engineering Expertise Where AI Needs Humans",
  items: [
    {
      title: "Software Engineering",
      description:
        "Experienced engineers capable of understanding, writing, debugging, reviewing, and evaluating production-quality software.",
      icon: Code2Icon,
    },
    {
      title: "AI Training",
      description:
        "Technical expertise applied to coding, reasoning, model training, preference evaluation, and structured feedback workflows.",
      icon: BrainCircuitIcon,
    },
    {
      title: "Model Evaluation",
      description:
        "Human review of AI-generated solutions for correctness, reasoning quality, maintainability, safety, and instruction adherence.",
      icon: ScanSearchIcon,
    },
    {
      title: "Human-in-the-Loop",
      description:
        "Skilled technical judgment for workflows where automated evaluation alone isn't enough.",
      icon: UsersRoundIcon,
    },
  ],
};

export const capabilities = {
  heading: "Real Engineers. Real Technical Depth.",
  description:
    "Our contributors work across modern languages, cloud platforms, and applied AI. We only take on work our team can genuinely support.",
  groups: [
    {
      label: "Languages & Frameworks",
      items: [
        "Python",
        "TypeScript",
        "JavaScript",
        "React",
        "Next.js",
        "Node.js",
        "Java",
        "C++",
        "Go",
        "SQL",
        "PostgreSQL",
      ],
    },
    {
      label: "Cloud & Infrastructure",
      items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes"],
    },
    {
      label: "Applied AI",
      items: [
        "LLMs",
        "RAG",
        "AI Agents",
        "Evaluation",
        "Prompt Engineering",
        "Machine Learning",
        "Data Engineering",
      ],
    },
  ],
} as const;

export const processOverview = {
  heading: "How It Works",
  description:
    "A simple path from joining an AI training platform to completing technical work and getting paid.",
  cta: "Explore Our Process",
  steps: [
    {
      number: "01",
      title: "Register on Supported Platforms",
      description:
        "Create an account on one or more AI training platforms and complete the required profile, identity, and skills information.",
    },
    {
      number: "02",
      title: "Complete the Screening Process",
      description:
        "Depending on the platform, you may complete an AI interview, technical assessment, coding test, or other qualification process.",
    },
    {
      number: "03",
      title: "Execute Assigned Tasks",
      description:
        "Once qualified, work on available projects such as coding, AI evaluation, technical reasoning, data review, or model-training tasks.",
    },
    {
      number: "04",
      title: "Get Paid",
      description:
        "Receive payment based on each platform's compensation structure, typically weekly, biweekly, monthly, or according to project-specific terms.",
    },
  ],
} as const;

export const processDetailed = {
  heading: "How It Works",
  description:
    "A simple path from joining an AI training platform to completing technical work and getting paid.",
  flowHeading: "From signup to payout",
  flowDescription:
    "Most platforms follow a similar sequence. Screening methods, the work you are assigned, and when you are paid still differ from one platform to the next.",
  branches: ["Coding", "AI Evaluation", "Technical Reasoning", "Data Review", "Model Training"],
  stages: ["Register", "Screening", "Assigned Tasks", "Get Paid"],
  steps: [
    {
      number: "01",
      title: "Register on Supported Platforms",
      description:
        "Create an account on one or more AI training platforms and complete the required profile, identity, and skills information.",
    },
    {
      number: "02",
      title: "Complete the Screening Process",
      description:
        "Depending on the platform, you may complete an AI interview, technical assessment, coding test, or other qualification process.",
    },
    {
      number: "03",
      title: "Execute Assigned Tasks",
      description:
        "Once qualified, work on available projects such as coding, AI evaluation, technical reasoning, data review, or model-training tasks.",
    },
    {
      number: "04",
      title: "Get Paid",
      description:
        "Receive payment based on each platform's compensation structure, typically weekly, biweekly, monthly, or according to project-specific terms.",
    },
  ],
} as const;

export const quality: { heading: string; description: string; pillars: FeatureItem[] } = {
  heading: "Built Around Quality, Not Just Throughput",
  description:
    "We establish credibility through process rather than claims. Here is how work is protected end to end.",
  pillars: [
    {
      title: "Technical Screening",
      description:
        "Contributors are matched according to actual technical capabilities.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Quality Review",
      description:
        "Outputs can be reviewed against project-specific requirements and evaluation criteria.",
      icon: ClipboardCheckIcon,
    },
    {
      title: "Accountability",
      description:
        "Clear ownership, communication, and feedback loops throughout project execution.",
      icon: UsersRoundIcon,
    },
  ],
};

export const finalCta = {
  heading: "AI Gets Better When the Right Humans Are Behind It.",
  description: "Bring experienced technical contributors into your next AI project.",
  primary: "Start a Conversation",
  secondary: "Join Our Network",
} as const;

export const about = {
  heading: "We Believe Better AI Requires Better Human Expertise",
  intro:
    "Skill Stand In was created around a simple idea: increasingly capable AI systems still depend on knowledgeable humans who can evaluate reasoning, recognize mistakes, write high-quality solutions, and provide meaningful feedback.",
  mission:
    "Connect exceptional technical talent with meaningful AI development and training work.",
  vision:
    "Build a global engineering network that helps make AI systems more capable, reliable, and useful.",
  principles: [
    {
      title: "Engineering Quality",
      description: "Quality matters more than raw task volume.",
    },
    {
      title: "Human Judgment",
      description: "The hardest AI problems still require knowledgeable people.",
    },
    {
      title: "Reliability",
      description: "Consistent execution builds trust.",
    },
    {
      title: "Continuous Learning",
      description: "AI changes quickly. Our engineers evolve with it.",
    },
  ],
} as const;

export const companies = {
  heading: "Technical Talent for AI Projects That Need More Than Generic Crowd Work",
  description:
    "When a project needs people who can read a stack trace, reason about an architecture, or judge whether generated code is actually correct, we bring in engineers, not a crowd.",
  engagementAreas: [
    "Coding evaluation",
    "Code generation review",
    "Software development",
    "AI response evaluation",
    "Technical reasoning",
    "Dataset validation",
    "Human preference evaluation",
    "Red teaming",
    "Model QA",
    "Data annotation",
    "Domain-specific evaluation",
    "AI agent testing",
  ],
  ctaHeading: "Have a project? Let's talk.",
  cta: "Discuss Your Project",
} as const;

export const engineers = {
  heading: "Put Your Engineering Skills to Work Training the Next Generation of AI",
  description:
    "We are building a network of engineers and technical specialists who want to apply real expertise to AI training, evaluation, and human-feedback work.",
  roles: [
    "Software Engineers",
    "ML Engineers",
    "Data Engineers",
    "DevOps Engineers",
    "QA Engineers",
    "Technical Writers",
    "Researchers",
    "Domain Experts",
  ],
  qualities: [
    "Strong technical fundamentals",
    "Clear written reasoning",
    "Attention to detail",
    "Ability to follow complex specifications",
    "Independent problem solving",
    "Comfortable reviewing AI-generated work",
    "Reliable availability",
  ],
  cta: "Join Our Network",
} as const;

export const projectTypes = [
  "Software Development",
  "AI Training",
  "Model Evaluation",
  "Coding Evaluation",
  "Data Annotation",
  "Human Feedback",
  "AI Agent Evaluation",
  "Other",
] as const;

export const teamSizes = ["1–5", "6–20", "21–50", "51–200", "200+", "Not sure yet"] as const;

export const timelines = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "3+ months",
  "Exploring options",
] as const;

export const budgetRanges = [
  "Under $10k",
  "$10k–$50k",
  "$50k–$150k",
  "$150k+",
  "Prefer to discuss",
] as const;

export const experienceRanges = ["0–2 years", "3–5 years", "6–10 years", "10+ years"] as const;
