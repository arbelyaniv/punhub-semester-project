export type Environment = "staging" | "production";

export type Resource = {
  title: string;
  description: string;
  href: string;
  /** Extra search terms that don't appear in the title or description. */
  keywords?: string[];
  environment?: Environment;
};

export type ResourceSection = {
  id: string;
  label: string;
  description: string;
  /** Search terms that apply to every resource in this section. */
  keywords: string[];
  resources: Resource[];
};

const staging: Resource[] = [
  {
    title: "Admin",
    description: "Captions, Users, Aministrivia in Staging",
    href: "https://admin.almostcrackd.ai",
    keywords: ["administrivia", "captions", "users"],
  },
  {
    title: "Matrix",
    description: "Humor Flavors, Mix/Match Steps in Staging",
    href: "https://matrix.almostcrackd.ai",
    keywords: ["flavors", "mix", "match"],
  },
  {
    title: "Studies",
    description: "Studies Released in Staging",
    href: "https://slightlyhumorous.org",
    keywords: ["study", "research"],
  },
  {
    title: "Stats",
    description: "Statistics for all Staging Studies",
    href: "https://stats.slightlyhumorous.org",
    keywords: ["statistics", "analytics", "metrics"],
  },
  {
    title: "Student Brain",
    description: "Student Brain Staging Hub",
    href: "https://brain.almostcrackd.ai",
    keywords: ["students"],
  },
].map((resource) => ({ ...resource, environment: "staging" as const }));

const production: Resource[] = [
  {
    title: "Admin",
    description: "Captions, Users, Administrivia in Production",
    href: "https://admin.crackd.ai",
    keywords: ["administrivia", "captions", "users"],
  },
  {
    title: "Matrix",
    description: "Humor Flavors, Mix/Match Steps in Production",
    href: "https://matrix.crackd.ai",
    keywords: ["flavors", "mix", "match"],
  },
  {
    title: "Studies",
    description: "Studies Released in Production",
    href: "https://humorstudy.org",
    keywords: ["study", "research"],
  },
  {
    title: "Stats",
    description: "Statistics for all Studies in Production",
    href: "https://stats.humorstudy.org",
    keywords: ["statistics", "analytics", "metrics"],
  },
  {
    title: "Student Brain",
    description: "Student Brain Production Hub",
    href: "https://brain.crackd.ai",
    keywords: ["students"],
  },
].map((resource) => ({ ...resource, environment: "production" as const }));

const github: Resource[] = [
  {
    title: "Admin",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/chucklesome",
  },
  {
    title: "Matrix",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/toosoon",
  },
  {
    title: "Studies",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/funnystudy",
  },
  {
    title: "Stats",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/the-lol-report",
    keywords: ["statistics"],
  },
  {
    title: "cronjob",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/cronaldo",
    keywords: ["cron", "scheduler", "jobs"],
  },
  {
    title: "Frontend - Student Brain",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/puniversity",
    keywords: ["ui", "web"],
  },
  {
    title: "API - Image Pipeline",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/nonchalant",
    keywords: ["backend", "images"],
  },
  {
    title: "API - Student Brain",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/lolumbia",
    keywords: ["backend"],
  },
  {
    title: "The Humor Project",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project",
    keywords: ["organization", "org"],
  },
  {
    title: "Humor Hub",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/punhub",
    keywords: ["dashboard", "this site"],
  },
];

const otherLinks: Resource[] = [
  {
    title: "Linear",
    description: "Task Pickup and Tracking",
    href: "https://linear.app/the-humor-project/team/HP/all",
    keywords: ["tasks", "issues", "tickets", "project management"],
  },
  {
    title: "Akify",
    description: "Standups and Progress-Tracking",
    href: "https://platform.akify.ai/",
    keywords: ["standup", "progress"],
  },
  {
    title: "Slack",
    description: "Where all humor discussions originate",
    href: "https://the-humor-project.slack.com",
    keywords: ["chat", "messaging", "communication"],
  },
  {
    title: "jpegasus",
    description: "LLM image scoring through nonchalant pipeline",
    href: "https://imagescores.almostcrackd.ai/",
    keywords: ["images", "scores", "ai"],
  },
];

export const sections: ResourceSection[] = [
  {
    id: "staging",
    label: "Staging",
    description: "Pre-release environments for testing changes",
    keywords: ["staging", "stage", "test", "apps"],
    resources: staging,
  },
  {
    id: "production",
    label: "Production",
    description: "Live environments used by real users",
    keywords: ["production", "prod", "live", "apps"],
    resources: production,
  },
  {
    id: "github",
    label: "GitHub Repositories",
    description: "Source code for every Humor Project service",
    keywords: ["github", "repo", "repository", "code", "source"],
    resources: github,
  },
  {
    id: "other",
    label: "Other Links",
    description: "Team tools and supporting services",
    keywords: ["tools", "other"],
    resources: otherLinks,
  },
];

export function displayUrl(href: string) {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
