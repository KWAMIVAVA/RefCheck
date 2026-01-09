"use client";

import { useState } from "react";
import { Download, FileJson, FileCode, ChevronDown } from "lucide-react";

export default function ExportButton({
  onExport,
}: {
  onExport: (format: "json" | "html") => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8 text-center relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="clay-button btn-secondary text-base px-6"
      >
        <Download className="w-4 h-4" />
        Export Report
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-border rounded-xl shadow-lg overflow-hidden min-w-[200px] z-10 fade-in">
          <button
            onClick={() => {
              onExport("json");
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 bg-transparent border-none font-inter text-base text-text-primary cursor-pointer text-left transition-colors duration-200 hover:bg-surface-elevated flex items-center gap-2"
          >
            <FileJson className="w-4 h-4" />
            Export as JSON
          </button>
          <button
            onClick={() => {
              onExport("html");
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 bg-transparent border-none border-t border-border-light font-inter text-base text-text-primary cursor-pointer text-left transition-colors duration-200 hover:bg-surface-elevated flex items-center gap-2"
          >
            <FileCode className="w-4 h-4" />
            Export as HTML
          </button>
        </div>
      )}
    </div>
  );
}
