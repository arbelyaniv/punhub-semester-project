"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type HubLink = {
  title: string;
  description: string;
  href: string;
};

const stagingLinks: HubLink[] = [
  {
    title: "Admin",
    description: "Captions, Users, Aministrivia in Staging",
    href: "https://admin.almostcrackd.ai",
  },
  {
    title: "Matrix",
    description: "Humor Flavors, Mix/Match Steps in Staging",
    href: "https://matrix.almostcrackd.ai",
  },
  {
    title: "Studies",
    description: "Studies Released in Staging",
    href: "https://slightlyhumorous.org",
  },
  {
    title: "Stats",
    description: "Statistics for all Staging Studies",
    href: "https://stats.slightlyhumorous.org",
  },
  {
    title: "Student Brain",
    description: "Student Brain Staging Hub",
    href: "https://brain.almostcrackd.ai",
  },
];

const productionLinks: HubLink[] = [
  {
    title: "Admin",
    description: "Captions, Users, Administrivia in Production",
    href: "https://admin.crackd.ai",
  },
  {
    title: "Matrix",
    description: "Humor Flavors, Mix/Match Steps in Production",
    href: "https://matrix.crackd.ai",
  },
  {
    title: "Studies",
    description: "Studies Released in Production",
    href: "https://humorstudy.org",
  },
  {
    title: "Stats",
    description: "Statistics for all Studies in Production",
    href: "https://stats.humorstudy.org",
  },
  {
    title: "Student Brain",
    description: "Student Brain Production Hub",
    href: "https://brain.crackd.ai",
  },
];

const githubLinks: HubLink[] = [
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
  },
  {
    title: "cronjob",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/cronaldo",
  },
  {
    title: "Frontend - Student Brain",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/puniversity",
  },
  {
    title: "API - Image Pipeline",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/nonchalant",
  },
  {
    title: "API - Student Brain",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/lolumbia",
  },
  {
    title: "The Humor Project",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project",
  },
  {
    title: "Humor Hub",
    description: "The Humor Project",
    href: "https://github.com/The-Humor-Project/punhub",
  },
];

const resourceLinks: HubLink[] = [
  {
    title: "Linear",
    description: "Task Pickup and Tracking",
    href: "https://linear.app/the-humor-project/team/HP/all",
  },
  {
    title: "Akify",
    description: "Standups and Progress-Tracking",
    href: "https://platform.akify.ai/",
  },
  {
    title: "Slack",
    description: "Where all humor discussions originate",
    href: "https://the-humor-project.slack.com",
  },
  {
    title: "jpegasus",
    description: "LLM image scoring through nonchalant pipeline",
    href: "https://imagescores.almostcrackd.ai/",
  },
];

const titleEmojiNetwork = Array.from({ length: 12 }, (_, row) =>
  Array.from({ length: 20 }, (_, column) => ({ row, column })),
)
  .flat()
  .filter(({ row, column }) => (row % 2 === 1 ? column % 4 === 2 : column % 4 === 0));

function createSeededRandom(seed: number) {
  let state = seed;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function randomInRange(random: () => number, min: number, max: number) {
  return min + random() * (max - min);
}

function roundToTenth(value: number) {
  return Math.round(value * 10) / 10;
}

const particles = Array.from({ length: 50 }, (_, index) => {
  const side = index % 2 === 0 ? "left" : "right";
  const row = Math.floor(index / 2);
  const top = 3 + ((row * 7 + index * 3) % 94);
  const distance = 26 + ((index * 11) % 30);
  const size = 3 + ((index * 5) % 8);
  const duration = 7.4 + ((index * 13) % 54) / 10;
  const delay = -(((index * 17) % 120) / 10);
  const drift = -30 + ((index * 19) % 61);

  return { side, top, distance, size, duration, delay, drift };
});

const twinkleRandom = createSeededRandom(0x9d4f2a1b);

const nightTwinkles = Array.from({ length: 150 }, () => {
  const left = roundToTenth(randomInRange(twinkleRandom, 2, 98));
  const top = roundToTenth(randomInRange(twinkleRandom, 2, 98));
  const size = roundToTenth(randomInRange(twinkleRandom, 3.5, 13));
  const duration = roundToTenth(randomInRange(twinkleRandom, 2.8, 7.2));
  const delay = -roundToTenth(randomInRange(twinkleRandom, 0, 9));
  const opacity = roundToTenth(randomInRange(twinkleRandom, 0.42, 0.94));

  return { left, top, size, duration, delay, opacity };
});

const nightParticleRandom = createSeededRandom(0x3b7c61e4);

const nightParticles = Array.from({ length: 70 }, (_, index) => {
  const left = roundToTenth(randomInRange(nightParticleRandom, 3, 97));
  const top = roundToTenth(randomInRange(nightParticleRandom, 4, 96));
  const size = roundToTenth(randomInRange(nightParticleRandom, 5, 16));
  const direction = index % 2 === 0 ? 1 : -1;
  const distance = roundToTenth(direction * randomInRange(nightParticleRandom, 14, 78));
  const lift = -roundToTenth(randomInRange(nightParticleRandom, 16, 64));
  const duration = roundToTenth(randomInRange(nightParticleRandom, 8, 14.8));
  const delay = -roundToTenth(randomInRange(nightParticleRandom, 0, 13));

  return { left, top, size, distance, lift, duration, delay };
});

const moonRandom = createSeededRandom(0x74c1e5a9);

const nightMoons = Array.from({ length: 9 }, (_, index) => {
  const left = roundToTenth(randomInRange(moonRandom, 4, 96));
  const top = roundToTenth(randomInRange(moonRandom, 4, 92));
  const size = roundToTenth(randomInRange(moonRandom, 22, 54));
  const opacity = roundToTenth(randomInRange(moonRandom, 0.22, 0.5));
  const phase = index % 3 === 0 ? "full" : "crescent";

  return { left, top, size, opacity, phase };
});

function ParticleField() {
  return (
    <div className="particleField" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          className={`particle ${particle.side}`}
          key={`${particle.side}-${particle.top}-${index}`}
          style={
            {
              "--top": `${particle.top}%`,
              "--distance": `${particle.distance}vw`,
              "--size": `${particle.size}px`,
              "--duration": `${particle.duration}s`,
              "--delay": `${particle.delay}s`,
              "--drift": `${particle.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

function NightSection() {
  const githubTitleRef = useRef<HTMLHeadingElement>(null);
  const resourceLinksTitleRef = useRef<HTMLHeadingElement>(null);
  const [hasEnteredGitHub, setHasEnteredGitHub] = useState(false);
  const [hasEnteredResources, setHasEnteredResources] = useState(false);

  useEffect(() => {
    const node = githubTitleRef.current;

    if (!node || hasEnteredGitHub) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setHasEnteredGitHub(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredGitHub(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.35,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasEnteredGitHub]);

  useEffect(() => {
    const node = resourceLinksTitleRef.current;

    if (!node || hasEnteredResources) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setHasEnteredResources(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredResources(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.35,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasEnteredResources]);

  return (
    <section className="nightSection" aria-label="Night sky">
      <div className="nightTwinkleField" aria-hidden="true">
        {nightMoons.map((moon, index) => (
          <span
            className={`nightMoon ${moon.phase}`}
            key={`night-moon-${index}`}
            style={
              {
                "--moon-left": `${moon.left}%`,
                "--moon-top": `${moon.top}%`,
                "--moon-size": `${moon.size}px`,
                "--moon-opacity": moon.opacity,
              } as CSSProperties
            }
          />
        ))}
        {nightTwinkles.map((twinkle, index) => (
          <span
            className="nightTwinkle"
            key={`twinkle-${index}`}
            style={
              {
                "--twinkle-left": `${twinkle.left}%`,
                "--twinkle-top": `${twinkle.top}%`,
                "--twinkle-size": `${twinkle.size}px`,
                "--twinkle-duration": `${twinkle.duration}s`,
                "--twinkle-delay": `${twinkle.delay}s`,
                "--twinkle-opacity": twinkle.opacity,
              } as CSSProperties
            }
          />
        ))}
        {nightParticles.map((particle, index) => (
          <span
            className="nightParticle"
            key={`night-particle-${index}`}
            style={
              {
                "--night-left": `${particle.left}%`,
                "--night-top": `${particle.top}%`,
                "--night-size": `${particle.size}px`,
                "--night-distance": `${particle.distance}px`,
                "--night-lift": `${particle.lift}px`,
                "--night-duration": `${particle.duration}s`,
                "--night-delay": `${particle.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div
        className={`githubLinks${hasEnteredGitHub ? " isVisible" : ""}`}
        aria-label="GitHub repositories"
      >
        <h2 className="githubTitle" ref={githubTitleRef}>
          Github
        </h2>
        {githubLinks.map((link) => (
          <a
            className="githubRepoLink"
            href={link.href}
            key={`${link.title}-${link.href}`}
            rel="noreferrer"
            target="_blank"
          >
            <span className="githubLinkContent">
              <span className="githubPillTitle">{link.title}</span>
              <span className="githubPillMeta">
                <span className="githubPillIcon" aria-hidden="true">
                  <GitHubIcon />
                </span>
                <span>{link.href.replace(/^https?:\/\//, "")}</span>
              </span>
            </span>
          </a>
        ))}
      </div>
      <div
        className={`resourceLinks${hasEnteredResources ? " isVisible" : ""}`}
        aria-labelledby="resource-links-title"
      >
        <h2 className="resourceLinksTitle" id="resource-links-title" ref={resourceLinksTitleRef}>
          Other Links
        </h2>
        <div className="resourceCardGrid">
          {resourceLinks.map((link) => (
            <a
              className="resourceCard"
              href={link.href}
              key={link.href}
              rel="noreferrer"
              target="_blank"
            >
              <span className="resourceCardSummary">
                <span className="resourceCardTitle">{link.title}</span>
                <span className="resourceCardSeparator" aria-hidden="true">
                  |
                </span>
                <span className="resourceCardDescription">{link.description}</span>
              </span>
              <span className="resourceCardUrl">{link.href.replace(/^https?:\/\//, "")}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkBubble({ link }: { link: HubLink }) {
  return (
    <a className="linkBubble" href={link.href} rel="noreferrer" target="_blank">
      <span className="linkTitle">{link.title}</span>
      <span className="linkDescription">
        <span>{link.description}</span>
        <span className="linkUrl">{link.href.replace(/^https?:\/\//, "")}</span>
      </span>
    </a>
  );
}

function EnvironmentSection({
  label,
  links,
  tone,
}: {
  label: string;
  links: HubLink[];
  tone: "staging" | "production";
}) {
  return (
    <section className={`environmentSection ${tone}`} aria-labelledby={`${tone}-title`}>
      <h2 id={`${tone}-title`}>{label}</h2>
      <div className="bubbleGrid">
        {links.map((link) => (
          <LinkBubble key={link.title} link={link} />
        ))}
      </div>
    </section>
  );
}

function ScrollCue() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const { documentElement } = document;
      const scrollBottom = window.scrollY + window.innerHeight;
      const canScroll = documentElement.scrollHeight > window.innerHeight + 24;
      const hasMoreBelow = scrollBottom < documentElement.scrollHeight - 24;

      setIsVisible(canScroll && hasMoreBelow);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div className={`scrollCue${isVisible ? " isVisible" : ""}`} aria-hidden="true">
      <span className="scrollCueChevron" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="pageShell">
      <ParticleField />
      <h1>
        <span className="titleEmojiBackdrop" aria-hidden="true">
          <span className="titleEmojiPattern">
            {titleEmojiNetwork.map(({ row, column }) => (
              <span
                className="titleEmoji"
                key={`${row}-${column}`}
                style={
                  {
                    "--emoji-column": column + 1,
                    "--emoji-row": row + 1,
                  } as CSSProperties
                }
              >
                🤣
              </span>
            ))}
          </span>
        </span>
        <span className="titleText">The Hall of Humor</span>
      </h1>
      <div className="environmentGrid">
        <EnvironmentSection label="Staging" links={stagingLinks} tone="staging" />
        <EnvironmentSection label="Production" links={productionLinks} tone="production" />
      </div>
      <ScrollCue />
      <NightSection />
    </main>
  );
}
