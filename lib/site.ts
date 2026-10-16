export type Entry = {
  title: string;
  year: string;
  summary: string;
  href?: string;
  highlight?: string;
};

export type Collection = {
  id: string;
  title: string;
  entries: Entry[];
};

export const profile = {
  first: "Lionel",
  last: "Arce",
  title: "Software & research engineer",
  place: "Buenos Aires",
  subtitle: "Research and software engineering, self-improving AI agents and training language models.",
  email: "lioarce1@gmail.com",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Papers", href: "#papers" },
  { label: "Lab", href: "https://seriora.ai/" },
  { label: "GitHub", href: "https://github.com/lzvxck" },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const work: Collection = {
  id: "work",
  title: "Work",
  entries: [
    {
      title: "seri",
      year: "2026",
      summary: "A cross-platform coding-agent harness, open source, built from scratch.",
      href: "https://github.com/Seriora-Research/seri-agent",
    },
    {
      title: "Chainforge",
      year: "2026",
      summary: "A Go framework for agents. The core has no external dependencies, and it speaks MCP.",
      href: "https://github.com/lzvxck/chainforge",
    },
    {
      title: "GRPO",
      year: "2026",
      summary: "Post-training a 1.7B model with GRPO on GSM8K. Accuracy moved from 66.9% to 87.3%.",
      highlight: "87.3%",
    },
  ],
};

export const papers: Collection = {
  id: "papers",
  title: "Papers",
  entries: [
    {
      title: "Most Self-Improving LLM-Agent Papers Fail Two or More Evaluation Traps",
      year: "2026",
      summary: "39 of 41 papers fail two or more known eval traps.",
      href: "https://www.alphaxiv.org/abs/2609.self-improving-llm-agent-evaluation-audits",
    },
    {
      title: "The Plurality Paradox",
      year: "2026",
      summary: "When disagreement between providers stops working as an alarm.",
      href: "https://www.alphaxiv.org/abs/2610.plurality-paradox-multi-provider-oversight",
    },
  ],
};

export const labNotes = "https://seriora.ai/blog";
