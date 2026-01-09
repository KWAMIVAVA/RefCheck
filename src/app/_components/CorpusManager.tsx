"use client";

import { useState } from "react";
import { ChevronDown, Plus, FileText, Trash2 } from "lucide-react";

export default function CorpusManager() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock reference documents
  const mockDocuments = [
    {
      id: "1",
      name: "Research Paper - AI Ethics.txt",
      wordCount: 3420,
      date: "2026-01-05",
    },
    {
      id: "2",
      name: "Article - Machine Learning.md",
      wordCount: 2150,
      date: "2026-01-03",
    },
    {
      id: "3",
      name: "Thesis Chapter 3.txt",
      wordCount: 5680,
      date: "2025-12-28",
    },
  ];

  const totalStorage = mockDocuments.reduce(
    (sum, doc) => sum + doc.wordCount,
    0,
  );
  const storagePercent = Math.min((totalStorage / 50000) * 100, 100);

  return (
    <div className="clay-card mb-8">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h2 className="text-2xl font-semibold mb-1">Reference Corpus</h2>
          <p className="font-inter text-sm text-text-secondary mb-0">
            {mockDocuments.length} documents stored locally
          </p>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-primary transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
            }`}
        />
      </div>

      {isExpanded && (
        <div className="mt-6 fade-in">
          {/* Upload Button */}
          <button
            className="clay-button btn-primary w-full justify-center mb-6"
            onClick={(e) => {
              e.stopPropagation();
              alert("File upload functionality will be implemented in Phase 2");
            }}
          >
            <Plus className="w-5 h-5" />
            Add Reference Document
          </button>

          {/* Storage Usage */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-inter text-sm text-text-secondary">
                Storage Used
              </span>
              <span className="font-inter text-sm text-text-secondary font-medium">
                {totalStorage.toLocaleString()} / 50,000 words
              </span>
            </div>
            <div className="w-full h-2 bg-surface-elevated rounded overflow-hidden">
              <div
                className={`h-full rounded transition-all duration-300 ${storagePercent > 80
                    ? "bg-status-high"
                    : "bg-primary"
                  }`}
                style={{ width: `${storagePercent}%` }}
              />
            </div>
          </div>

          {/* Document List */}
          <div className="flex flex-col gap-2">
            {mockDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-elevated border border-border-light rounded-xl p-4 flex justify-between items-center transition-all duration-200 hover:bg-white hover:border-border"
              >
                <div className="flex-1">
                  <div className="font-inter text-base font-medium text-text-primary mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {doc.name}
                  </div>
                  <div className="font-inter text-xs text-text-tertiary">
                    {doc.wordCount.toLocaleString()} words • Added {doc.date}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Delete ${doc.name}? (Functionality in Phase 2)`);
                  }}
                  className="p-2 rounded-lg transition-colors duration-200 hover:bg-status-high-bg text-status-high"
                  title="Delete document"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
