import { useState, useEffect } from "react";

type ReturnType = [string | null, (query: string | null) => void];

/**
 * @name useSearchDebounce
 * @param delay - the delay in milliseconds to debounce the search query
 * @description This hook debounces the search query and returns the debounced value
 * @returns [debouncedValue, setQuery]
 */

export function useSearchDebounce(delay = 350): ReturnType {
  const [query, setQuery] = useState<string | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  return [debouncedValue, setQuery];
}
