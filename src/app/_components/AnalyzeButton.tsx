"use client";

import { Search, Loader2 } from "lucide-react";

export default function AnalyzeButton({
  onClick,
  disabled,
  isLoading,
}: {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}) {
  return (
    <div className="mb-8 text-center">
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className="clay-button btn-primary text-lg px-8 py-4 font-semibold min-w-[240px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Analyze Document
          </>
        )}
      </button>

      {disabled && !isLoading && (
        <p className="font-inter text-sm text-text-tertiary mt-2 mb-0">
          Please submit a document to analyze
        </p>
      )}
    </div>
  );
}
