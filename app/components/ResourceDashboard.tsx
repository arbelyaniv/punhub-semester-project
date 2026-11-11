"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  categories,
  displayUrl,
  sections,
  type CategoryId,
  type Resource,
  type ResourceSection,
} from "../data/resources";
import { useFavorites } from "./useFavorites";

type CategoryFilter = CategoryId | "all";

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

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`starIcon${filled ? " filled" : ""}`}>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

type CardProps = {
  resource: Resource;
  sectionId: string;
  isFavorite: boolean;
  onToggleFavorite: (href: string) => void;
};

function ResourceCard({ resource, sectionId, isFavorite, onToggleFavorite }: CardProps) {
  const isRepo = sectionId === "github";
  const name = isRepo
    ? `${resource.title} repository`
    : resource.environment
      ? `${resource.title} (${resource.environment})`
      : resource.title;

  return (
    // The star is a sibling of the link, not a child: buttons can't be nested inside <a>.
    <div className="cardWrap">
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
      <button
        type="button"
        className={`starButton${isFavorite ? " active" : ""}`}
        onClick={() => onToggleFavorite(resource.href)}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <StarIcon filled={isFavorite} />
      </button>
    </div>
  );
}

type FavoriteProps = {
  favorites: string[];
  onToggleFavorite: (href: string) => void;
};

function Section({ section, favorites, onToggleFavorite }: { section: ResourceSection } & FavoriteProps) {
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
          <ResourceCard
            key={resource.href}
            resource={resource}
            sectionId={section.id}
            isFavorite={favorites.includes(resource.href)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}

type QuickAccessProps = FavoriteProps & {
  /** Favorites that pass the current search and category filter, in the order they were added. */
  visible: { resource: Resource; sectionId: string }[];
  onClearAll: () => void;
};

function QuickAccess({ favorites, visible, onToggleFavorite, onClearAll }: QuickAccessProps) {
  if (favorites.length === 0) {
    return (
      <div className="quickAccessHint">
        <StarIcon filled={false} />
        <span>
          <strong>Quick Access</strong> — star any resource to pin it here. Favorites are saved in this
          browser.
        </span>
      </div>
    );
  }

  return (
    <section className="section quickAccess" aria-labelledby="quick-access-title">
      <div className="sectionHeader quickAccessHeader">
        <div>
          <h2 id="quick-access-title">
            <StarIcon filled />
            Quick Access
            <span className="sectionCount">{favorites.length}</span>
          </h2>
          <p>Your starred resources. Click the star again to remove one.</p>
        </div>
        <button type="button" className="clearButton" onClick={onClearAll}>
          Clear all
        </button>
      </div>
      {visible.length > 0 ? (
        <div className="cardGrid">
          {visible.map(({ resource, sectionId }) => (
            <ResourceCard
              key={resource.href}
              resource={resource}
              sectionId={sectionId}
              isFavorite
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <p className="quickAccessEmpty">None of your favorites match the current search or category.</p>
      )}
    </section>
  );
}

export default function ResourceDashboard() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const inputRef = useRef<HTMLInputElement>(null);

  // Search first, so each category button can show how many search results it holds.
  const searchResults = useMemo(() => filterSections(query), [query]);
  const results =
    category === "all" ? searchResults : searchResults.filter((s) => s.category === category);

  const countResources = (list: ResourceSection[]) =>
    list.reduce((total, section) => total + section.resources.length, 0);
  const matchCount = countResources(results);
  const searchMatchCount = countResources(searchResults);
  const isSearching = query.trim().length > 0;
  const categoryLabel = categories.find((c) => c.id === category)?.label ?? "All";

  const visibleFavorites = useMemo(() => {
    const byHref = new Map<string, { resource: Resource; sectionId: string }>();
    for (const section of results) {
      for (const resource of section.resources) {
        byHref.set(resource.href, { resource, sectionId: section.id });
      }
    }
    return favorites.flatMap((href) => byHref.get(href) ?? []);
  }, [favorites, results]);

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

  const favoriteProps = { favorites, onToggleFavorite: toggleFavorite };
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

      <div className="categoryFilters" role="group" aria-label="Filter by category">
        {categories.map((option) => {
          const count =
            option.id === "all"
              ? searchMatchCount
              : countResources(searchResults.filter((s) => s.category === option.id));

          return (
            <button
              key={option.id}
              type="button"
              className={`categoryButton${category === option.id ? " active" : ""}`}
              aria-pressed={category === option.id}
              onClick={() => setCategory(option.id)}
            >
              {option.label}
              <span className="categoryCount">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="resultSummary" aria-live="polite">
        {`${matchCount} ${
          isSearching ? (matchCount === 1 ? "result" : "results") : matchCount === 1 ? "resource" : "resources"
        }`}
        {isSearching && ` for “${query.trim()}”`}
        {category !== "all" && ` in ${categoryLabel}`}
      </p>

      <QuickAccess
        {...favoriteProps}
        visible={visibleFavorites}
        onClearAll={clearFavorites}
      />

      {matchCount === 0 ? (
        <div className="emptyState">
          <p className="emptyTitle">
            {isSearching ? `No resources match “${query.trim()}”` : "No resources here yet"}
            {category !== "all" && ` in ${categoryLabel}`}
          </p>
          <p>
            {category !== "all" && searchMatchCount > 0
              ? `There ${searchMatchCount === 1 ? "is 1 match" : `are ${searchMatchCount} matches`} in other categories.`
              : "Try a different name, a repository name, or terms like “staging” or “github”."}
          </p>
          <div className="emptyActions">
            {category !== "all" && (
              <button type="button" className="clearButton" onClick={() => setCategory("all")}>
                Show all categories
              </button>
            )}
            {isSearching && (
              <button type="button" className="clearButton" onClick={clearSearch}>
                Clear search
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {environments.length > 0 && (
            <div className="environmentGrid">
              {environments.map((section) => (
                <Section key={section.id} section={section} {...favoriteProps} />
              ))}
            </div>
          )}
          {others.map((section) => (
            <Section key={section.id} section={section} {...favoriteProps} />
          ))}
        </>
      )}
    </>
  );
}
