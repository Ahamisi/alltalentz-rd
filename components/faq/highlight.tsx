import type { ReactNode } from "react";

/**
 * Wrap every occurrence of `query` in `text` with a soft highlight, so a search
 * result shows *why* it matched instead of leaving the user to re-scan the line.
 * Case-insensitive; returns the plain string when there is nothing to mark.
 */
export function highlight(text: string, query: string): ReactNode {
  const needle = query.trim();
  if (!needle) return text;

  // Escape regex metacharacters — questions contain "/", "?" and "(" freely.
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    part.toLowerCase() === needle.toLowerCase() ? (
      <mark
        key={index}
        className="rounded-[3px] bg-[#FDE7C4] px-[1px] text-inherit"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}
