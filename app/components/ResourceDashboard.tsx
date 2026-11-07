"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { displayUrl, sections, type Resource, type ResourceSection } from "../data/resources";

function searchText(resource: Resource, section: ResourceSection) {
  return [
    resource.title,
    resource.description,
    displayUrl(resource.href),
    section.label,
    ...section.keywords,
    ...(resource.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

/** Every word in the query must appear somewhere in the resource's search text. */
function filterSections(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return sections;
  }

  return sections
    .map((section) => ({
      ...section,
      resources: section.resources.filter((resource) => {
        const text = searchText(resource, section);
        return terms.every((term) => text.includes(term));
      }),
    }))
    .filter((section) => section.resources.length > 0);
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="searchIcon">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="githubIcon">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

function ResourceCard({ resource, sectionId }: { resource: Resource; sectionId: string }) {
  const isRepo = sectionId === "github";

  return (
    <a className="card" href={resource.href} rel="noreferrer" target="_blank">
      <span className="cardHeader">
        {isRepo && <GitHubIcon />}
        <span className="cardTitle">{resource.title}</span>
        {resource.environment && (
          <span className={`badge ${resource.environment}`}>
            {resource.environment === "staging" ? "Staging" : "Production"}
          </span>
        )}
      </span>
      {!isRepo && <span className="cardDescription">{resource.description}</span>}
      <span className="cardUrl">
        {isRepo ? displayUrl(resource.href).replace(/^github\.com\//, "") : displayUrl(resource.href)}
      </span>
    </a>
  );
}

function Section({ section }: { section: ResourceSection }) {
  return (
    <section
      className={`section section-${section.id}`}
      aria-labelledby={`${section.id}-title`}
    >
      <div className="sectionHeader">
        <h2 id={`${section.id}-title`}>
          {section.label}
          <span className="sectionCount">{section.resources.length}</span>
        </h2>
        <p>{section.description}</p>
      </div>
      <div className="cardGrid">
        {section.resources.map((resource) => (
          <ResourceCard key={resource.href} resource={resource} sectionId={section.id} />
        ))}
      </div>
    </section>
  );
}

export default function ResourceDashboard() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => filterSections(query), [query]);
  const matchCount = results.reduce((total, section) => total + section.resources.length, 0);
  const isSearching = query.trim().length > 0;

  // Press "/" anywhere to jump to the search box.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const environments = results.filter((s) => s.id === "staging" || s.id === "production");
  const others = results.filter((s) => s.id !== "staging" && s.id !== "production");

  return (
    <>
      <div className="searchBar" role="search">
        <SearchIcon />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") clearSearch();
          }}
          placeholder="Search apps, repositories and tools…"
          aria-label="Search resources"
          autoComplete="off"
          spellCheck={false}
        />
        {isSearching ? (
          <button type="button" className="clearButton" onClick={clearSearch}>
            Clear
          </button>
        ) : (
          <kbd className="shortcutHint" aria-hidden="true">
            /
          </kbd>
        )}
      </div>

      <p className="resultSummary" aria-live="polite">
        {isSearching
          ? `${matchCount} ${matchCount === 1 ? "result" : "results"} for “${query.trim()}”`
          : `${matchCount} resources`}
      </p>

      {matchCount === 0 ? (
        <div className="emptyState">
          <p className="emptyTitle">No resources match “{query.trim()}”</p>
          <p>Try a different name, a repository name, or terms like “staging” or “github”.</p>
          <button type="button" className="clearButton" onClick={clearSearch}>
            Clear search
          </button>
        </div>
      ) : (
        <>
          {environments.length > 0 && (
            <div className="environmentGrid">
              {environments.map((section) => (
                <Section key={section.id} section={section} />
              ))}
            </div>
          )}
          {others.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </>
      )}
    </>
  );
}
