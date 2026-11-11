"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "punhub:favorites";

function readFavorites(): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); favorites just won't persist.
  }
}

/**
 * Favorite resources, identified by their href, persisted in localStorage.
 * Starts empty and loads after mount so server and client render the same markup.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());

    // Keep multiple open tabs in sync.
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setFavorites(readFavorites());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleFavorite = useCallback((href: string) => {
    setFavorites((current) => {
      const next = current.includes(href)
        ? current.filter((item) => item !== href)
        : [...current, href];
      writeFavorites(next);
      return next;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    writeFavorites([]);
  }, []);

  return { favorites, toggleFavorite, clearFavorites };
}
