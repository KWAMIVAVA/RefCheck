"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SourceBreakdown({
  sources,
}: {
  sources: Array<{
    id: string;
    name: string;
    similarity: number;
    matchCount: number;
    color: string;
  }>;
}) {
  const [sortBy, setSortBy] = useState<"similarity" | "name">("similarity");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sortedSources = [...sources].sort((a, b) => {
    if (sortBy === "similarity") {
      return b.similarity - a.similarity;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="clay-card mb-8 fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold mb-0">Source Breakdown</h2>
        <div className="flex gap-2 font-inter text-sm">
          <span className="text-text-tertiary">Sort by:</span>
          <button
            onClick={() => setSortBy("similarity")}
            className={`transition-colors ${sortBy === "similarity"
                ? "text-primary font-semibold underline"
                : "text-text-secondary"
              }`}
          >
            Similarity
          </button>
          <span className="text-text-tertiary">|</span>
          <button
            onClick={() => setSortBy("name")}
            className={`transition-colors ${sortBy === "name"
                ? "text-primary font-semibold underline"
                : "text-text-secondary"
              }`}
          >
            Name
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {sortedSources.map((source) => (
          <div
            key={source.id}
            className="bg-surface-elevated border border-border-light rounded-xl overflow-hidden transition-all duration-300"
          >
            {/* Source Header */}
            <div
              onClick={() =>
                setExpandedId(expandedId === source.id ? null : source.id)
              }
              className="p-4 cursor-pointer flex justify-between items-center gap-4"
            >
              <div className="flex-1 flex items-center gap-4">
                {/* Color Indicator */}
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: source.color }}
                />

                {/* Source Name */}
                <div className="flex-1">
                  <div className="font-inter text-base font-medium text-text-primary mb-0.5">
                    {source.name}
                  </div>
                  <div className="font-inter text-xs text-text-tertiary">
                    {source.matchCount} matching segments
                  </div>
                </div>
              </div>

              {/* Similarity Percentage */}
              <div className="font-inter text-xl font-bold text-primary min-w-[60px] text-right">
                {source.similarity}%
              </div>

              {/* Expand Arrow */}
              <ChevronDown
                className={`w-5 h-5 text-text-tertiary transition-transform duration-300 ${expandedId === source.id ? "rotate-180" : ""
                  }`}
              />
            </div>

            {/* Expanded Details */}
            {expandedId === source.id && (
              <div className="p-4 pt-0 border-t border-border-light fade-in">
                <div className="font-inter text-sm text-text-secondary leading-relaxed">
                  <p className="mb-2">
                    <strong>Match Details:</strong>
                  </p>
                  <ul className="pl-6 m-0 list-disc space-y-1">
                    <li>Total matching segments: {source.matchCount}</li>
                    <li>Similarity score: {source.similarity}%</li>
                    <li className="flex items-center gap-2">
                      Highlighted in comparison view with
                      <span
                        className="inline-block w-3 h-3 rounded-full align-middle"
                        style={{ background: source.color }}
                      />
                      this color
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
