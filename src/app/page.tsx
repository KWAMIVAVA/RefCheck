"use client";

import { useState } from "react";
import { FileText, BarChart3, ChartNetwork } from "lucide-react";
import Header from "@/app/_components/Header";
import DocumentInput from "@/app/_components/DocumentInput";
import CorpusManager from "@/app/_components/CorpusManager";
import AnalyzeButton from "@/app/_components/AnalyzeButton";
import SummaryReport from "@/app/_components/SummaryReport";
import SourceBreakdown from "@/app/_components/SourceBreakdown";
import ComparisonView from "@/app/_components/ComparisonView";
import ExportButton from "@/app/_components/ExportButton";

export default function Home() {
  const [documentText, setDocumentText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mobileTab, setMobileTab] = useState<"input" | "results">("input");

  // Mock data for demonstration
  const mockSimilarityScore = 42;
  const mockRiskLevel: "low" | "medium" | "high" = "medium";

  const mockSources = [
    {
      id: "1",
      name: "Research Paper - AI Ethics.txt",
      similarity: 38,
      matchCount: 12,
      color: "#FF6B6B",
    },
    {
      id: "2",
      name: "Article - Machine Learning.md",
      similarity: 25,
      matchCount: 8,
      color: "#4ECDC4",
    },
    {
      id: "3",
      name: "Thesis Chapter 3.txt",
      similarity: 15,
      matchCount: 5,
      color: "#FFE66D",
    },
  ];

  const mockUserText = `Artificial intelligence has become increasingly important in modern society. Machine learning algorithms are now used in various applications, from healthcare to finance. The ethical implications of AI deployment must be carefully considered to ensure responsible innovation.

Deep learning techniques have revolutionized computer vision and natural language processing. Neural networks can now perform tasks that were previously thought to require human intelligence. However, concerns about bias and fairness in AI systems remain significant challenges.

The future of AI research will likely focus on developing more interpretable and transparent models. Explainable AI is crucial for building trust and ensuring accountability in automated decision-making systems.`;

  const mockReferenceText = `Machine learning algorithms are now used in various applications, from healthcare to finance. The development of these systems requires careful consideration of ethical implications and potential societal impacts.

Neural networks have demonstrated remarkable capabilities in computer vision and natural language processing tasks. These deep learning techniques represent a significant advancement in artificial intelligence research.

Building trust in AI systems requires transparency and interpretability. Explainable AI approaches are essential for ensuring accountability in automated decision-making processes.`;

  const mockHighlights = [
    {
      userStart: 85,
      userEnd: 185,
      refStart: 0,
      refEnd: 100,
      color: "#FF6B6B",
      sourceName: "Research Paper - AI Ethics.txt",
    },
    {
      userStart: 320,
      userEnd: 450,
      refStart: 200,
      refEnd: 330,
      color: "#4ECDC4",
      sourceName: "Article - Machine Learning.md",
    },
    {
      userStart: 550,
      userEnd: 680,
      refStart: 400,
      refEnd: 530,
      color: "#FFE66D",
      sourceName: "Thesis Chapter 3.txt",
    },
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);

    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      // Auto-switch to results tab on mobile after analysis
      setMobileTab("results");
    }, 2000);
  };

  const handleExport = (format: "json" | "html") => {
    if (format === "json") {
      const data = {
        similarityScore: mockSimilarityScore,
        riskLevel: mockRiskLevel,
        sources: mockSources,
        timestamp: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `similarity-report-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert("HTML export will be implemented in Phase 2");
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main Content - Two Column Layout with Independent Scrolling */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
        {/* Left Column: Input & Corpus - Scrollable */}
        <div
          className={`flex flex-col gap-4 overflow-y-auto pr-2 ${mobileTab === "input" ? "block" : "hidden lg:flex"
            }`}
        >
          <Header />
          <DocumentInput onTextChange={setDocumentText} />
          <CorpusManager />
          <div className="sticky bottom-0 bg-bg pt-4 pb-2">
            <AnalyzeButton
              onClick={handleAnalyze}
              disabled={!documentText.trim()}
              isLoading={isAnalyzing}
            />
          </div>
        </div>

        {/* Right Column: Results - Scrollable */}
        <div
          className={`flex flex-col overflow-y-auto pr-2 ${mobileTab === "results" ? "block" : "hidden lg:flex"
            }`}
        >
          {showResults ? (
            <div id="results-section" className="space-y-4">
              <SummaryReport
                similarityScore={mockSimilarityScore}
                riskLevel={mockRiskLevel}
              />

              <SourceBreakdown sources={mockSources} />

              <ComparisonView
                userText={mockUserText}
                referenceText={mockReferenceText}
                referenceName="Research Paper - AI Ethics.txt"
                highlights={mockHighlights}
              />

              <ExportButton onExport={handleExport} />
            </div>
          ) : (
            <div className="clay-card h-full flex items-center justify-center">
              <div className="text-center text-text-tertiary">
                <ChartNetwork className="w-24 h-24 md:w-16 md:h-16 mb-4 text-text-tertiary mx-auto" />
                <h3 className="text-xl font-semibold mb-2 text-text-secondary">
                  Results will appear here
                </h3>
                <p className="text-sm">
                  Submit a document and click "Analyze Document" to see
                  similarity results
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <div className="lg:hidden shrink-0 bg-surface border-t border-border shadow-lg">
        <div className="flex">
          <button
            onClick={() => setMobileTab("input")}
            className={`flex-1 py-3 px-4 font-inter font-medium text-xs transition-all flex flex-col items-center justify-center gap-1 ${mobileTab === "input"
                ? "text-primary bg-primary-alpha"
                : "text-text-secondary"
              }`}
          >
            <FileText className="w-5 h-5" />
            <span>Input</span>
          </button>
          <button
            onClick={() => setMobileTab("results")}
            className={`flex-1 py-3 px-4 font-inter font-medium text-xs transition-all flex flex-col items-center justify-center gap-1 relative ${mobileTab === "results"
                ? "text-primary bg-primary-alpha"
                : "text-text-secondary"
              }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Results</span>
            {showResults && (
              <span className="absolute top-2 right-1/4 bg-primary text-white text-xs w-2 h-2 rounded-full" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
