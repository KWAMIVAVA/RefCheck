"use client";

import { useState } from "react";

export default function ComparisonView({
  userText,
  referenceText,
  referenceName,
  highlights,
}: {
  userText: string;
  referenceText: string;
  referenceName: string;
  highlights: Array<{
    userStart: number;
    userEnd: number;
    refStart: number;
    refEnd: number;
    color: string;
    sourceName: string;
  }>;
}) {
  const [hoveredHighlight, setHoveredHighlight] = useState<number | null>(null);

  const renderTextWithHighlights = (
    text: string,
    highlights: Array<{
      start: number;
      end: number;
      color: string;
      sourceName: string;
    }>,
    isUserDoc: boolean,
  ) => {
    if (highlights.length === 0) {
      return <span>{text}</span>;
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    highlights.forEach((highlight, index) => {
      // Add text before highlight
      if (highlight.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {text.substring(lastIndex, highlight.start)}
          </span>,
        );
      }

      // Add highlighted text
      parts.push(
        <span
          key={`highlight-${index}`}
          onMouseEnter={() => setHoveredHighlight(index)}
          onMouseLeave={() => setHoveredHighlight(null)}
          className="rounded-md px-1 py-0.5 cursor-pointer transition-opacity duration-200 relative"
          style={{
            background: highlight.color,
            opacity: hoveredHighlight === index ? 1 : 0.7,
          }}
          title={`Match from: ${highlight.sourceName}`}
        >
          {text.substring(highlight.start, highlight.end)}
          {hoveredHighlight === index && (
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-text-primary text-white px-2 py-1 rounded-md text-xs whitespace-nowrap mb-1 z-10 font-inter">
              Match from: {highlight.sourceName}
            </span>
          )}
        </span>,
      );

      lastIndex = highlight.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    }

    return <>{parts}</>;
  };

  const userHighlights = highlights.map((h) => ({
    start: h.userStart,
    end: h.userEnd,
    color: h.color,
    sourceName: h.sourceName,
  }));

  const refHighlights = highlights.map((h) => ({
    start: h.refStart,
    end: h.refEnd,
    color: h.color,
    sourceName: h.sourceName,
  }));

  return (
    <div className="clay-card mb-8 fade-in">
      <h2 className="text-2xl font-semibold mb-6">Side-by-Side Comparison</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Document */}
        <div>
          <div className="font-inter text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">
            Your Document
          </div>
          <div className="bg-surface-elevated rounded-xl p-6 text-base leading-relaxed font-['Merriweather'] text-text-primary max-h-[600px] overflow-y-auto border border-border-light">
            {renderTextWithHighlights(userText, userHighlights, true)}
          </div>
        </div>

        {/* Reference Document */}
        <div>
          <div className="font-inter text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">
            Reference: {referenceName}
          </div>
          <div className="bg-surface-elevated rounded-xl p-6 text-base leading-relaxed font-['Merriweather'] text-text-primary max-h-[600px] overflow-y-auto border border-border-light">
            {renderTextWithHighlights(referenceText, refHighlights, false)}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-surface-elevated rounded-xl font-inter text-sm text-text-secondary">
        <strong>Tip:</strong> Hover over highlighted text to see the source
        document. Matching segments are color-coded to help you identify which
        reference document they came from.
      </div>
    </div>
  );
}
