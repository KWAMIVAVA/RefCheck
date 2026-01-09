"use client";

import { AlertCircle } from "lucide-react";

export default function SummaryReport({
  similarityScore,
  riskLevel,
}: {
  similarityScore: number;
  riskLevel: "low" | "medium" | "high";
}) {
  const getBadgeClass = () => {
    switch (riskLevel) {
      case "low":
        return "badge-low";
      case "medium":
        return "badge-medium";
      case "high":
        return "badge-high";
      default:
        return "badge-low";
    }
  };

  const getRiskLabel = () => {
    switch (riskLevel) {
      case "low":
        return "Low Similarity";
      case "medium":
        return "Medium Similarity";
      case "high":
        return "High Similarity";
      default:
        return "Low Similarity";
    }
  };

  const getExplanation = () => {
    switch (riskLevel) {
      case "low":
        return "The submitted document shows minimal textual overlap with reference sources. This suggests original content or proper paraphrasing.";
      case "medium":
        return "The submitted document shows moderate textual overlap with reference sources. Review the highlighted sections to ensure proper attribution and paraphrasing.";
      case "high":
        return "The submitted document shows significant textual overlap with reference sources. Careful review is recommended to verify proper citations and original contribution.";
      default:
        return "";
    }
  };

  return (
    <div className="clay-card mb-8 fade-in">
      <h2 className="text-2xl font-semibold mb-6">Similarity Summary</h2>

      {/* Large Similarity Score */}
      <div className="text-center mb-8">
        <div className="text-6xl font-bold font-inter text-primary mb-4 leading-none">
          {similarityScore}%
        </div>
        <div className={`badge text-base ${getBadgeClass()}`}>
          {getRiskLabel()}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-surface-elevated rounded-xl p-6 mb-6">
        <p className="font-inter text-base leading-relaxed text-text-secondary mb-0">
          {getExplanation()}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="border-l-4 border-primary pl-4 bg-primary-alpha p-4 rounded-md">
        <p className="font-inter text-sm leading-relaxed text-text-secondary mb-0 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            <strong>Important:</strong> This analysis provides similarity
            indications only. Similarity does not equal plagiarism. Final
            judgments must consider context, proper citations, and academic
            standards, and should be made by qualified human evaluators.
          </span>
        </p>
      </div>
    </div>
  );
}
