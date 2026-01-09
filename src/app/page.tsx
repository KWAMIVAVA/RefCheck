"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, ChartNetwork, PencilLine } from "lucide-react";
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

  // Mobile stepper state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

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
      // Move to results step on mobile
      setCurrentStep(3);
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

  const canGoNext = () => {
    if (currentStep === 1) return documentText.trim().length > 0;
    if (currentStep === 2) return true;
    return false;
  };

  const handleNext = () => {
    if (currentStep < totalSteps && canGoNext()) {
      if (currentStep === 2) {
        // Trigger analysis when moving from step 2 to 3
        handleAnalyze();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Input Document";
      case 2: return "Manage Corpus";
      case 3: return "View Results";
      default: return "";
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Mobile: Stepper Header with App Branding */}
      <div className="lg:hidden shrink-0 bg-surface border-b border-border">
        {/* App Branding */}
        <div className="px-4 pt-3 pb-2 border-b border-border">
          <h1 className="text-base font-semibold text-center">Document Similarity Checker</h1>
          <p className="text-xs text-text-secondary text-center font-inter">Privacy-first analysis</p>
        </div>

        {/* Stepper */}
        <div className="p-4">
          <div className="flex items-center justify-center mb-3">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => {
                    // Allow going back to completed steps
                    if (step < currentStep || (step === 3 && showResults)) {
                      setCurrentStep(step);
                    }
                  }}
                  disabled={step > currentStep && !(step === 3 && showResults)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step < currentStep || (step === 3 && showResults && step !== currentStep)
                      ? "bg-primary text-white cursor-pointer"
                      : step === currentStep
                        ? "bg-primary text-white"
                        : "bg-surface-elevated text-text-tertiary"
                    }`}
                >
                  {step < currentStep || (step === 3 && showResults && step !== currentStep) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step
                  )}
                </button>
                {index < 2 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${step < currentStep ? "bg-primary" : "bg-border"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-lg font-semibold text-center">{getStepTitle(currentStep)}</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
        {/* Left Column: Input & Corpus */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          <div className="hidden lg:block">
            <Header />
          </div>

          {/* Step 1: Document Input (Mobile) */}
          <div className={currentStep === 1 ? "block lg:block" : "hidden lg:block"}>
            <DocumentInput onTextChange={setDocumentText} />
          </div>

          {/* Step 2: Corpus Manager (Mobile) */}
          <div className={currentStep === 2 ? "block lg:block" : "hidden lg:block"}>
            <CorpusManager />
          </div>

          {/* Desktop: Sticky Analyze Button */}
          <div className="hidden lg:block sticky bottom-0 bg-bg pt-4 pb-2">
            <AnalyzeButton
              onClick={handleAnalyze}
              disabled={!documentText.trim()}
              isLoading={isAnalyzing}
            />
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="flex flex-col overflow-y-auto pr-2">
          {/* Step 3: Results (Mobile) */}
          <div className={currentStep === 3 ? "block lg:block" : "hidden lg:block"}>
            {showResults ? (
              <div className="space-y-4">
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
              <div className="hidden lg:flex clay-card h-full items-center justify-center">
                <div className="text-center text-text-tertiary">
                  <ChartNetwork className="w-16 h-16 mb-4 text-text-tertiary mx-auto" />
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
      </div>

      {/* Mobile: Navigation Buttons */}
      <div className="lg:hidden shrink-0 p-4 bg-surface border-t border-border">
        <div className="flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="clay-button btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={!canGoNext() || isAnalyzing}
              className={`clay-button btn-primary flex-1 flex items-center justify-center gap-2 ${currentStep === 1 ? "w-full" : ""
                }`}
            >
              {currentStep === 2 ? (
                isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze
                    <ChevronRight className="w-4 h-4" />
                  </>
                )
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(1)}
              className="clay-button btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <PencilLine className="w-4 h-4" />
              Edit Document
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
