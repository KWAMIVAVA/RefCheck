"use client";

import { Info } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <header className="clay-card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">
            Document Similarity Checker
          </h1>
          <p className="text-sm text-text-secondary mb-0 font-inter">
            Privacy-first, client-side text similarity analysis
          </p>
        </div>

        <div className="relative">
          <button
            className="clay-button w-9 h-9 rounded-full! p-0! flex items-center justify-center text-primary"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            title="Important Information"
            aria-label="Information about similarity vs plagiarism"
          >
            <Info className="w-5 h-5" />
          </button>

          {showTooltip && (
            <div className="absolute top-10 right-0 bg-white border border-border rounded-xl p-3 shadow-lg w-72 text-xs font-inter leading-relaxed z-50 fade-in">
              <strong className="text-primary mb-1 flex items-center gap-2 text-sm">
                <Info className="w-3 h-3" />
                Important Disclaimer
              </strong>
              <p className="mb-1">
                This tool provides <strong>similarity indications only</strong>.
                Similarity does not equal plagiarism.
              </p>
              <p className="mb-0">
                Final judgments must be made by human evaluators considering
                context, citations, and academic standards.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Footer Info */}
      <div className="mt-4 pt-3 border-t border-border">
        <p className="text-xs text-text-tertiary font-inter text-center">
          All processing happens locally in your browser • Your documents never leave your device
        </p>
      </div>
    </header>
  );
}
