"use client";

import { useState } from "react";
import { FileText, X } from "lucide-react";

export default function DocumentInput({
  onTextChange,
}: {
  onTextChange: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleFileUpload = (file: File) => {
    if (
      file.type === "text/plain" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md")
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
        onTextChange(content);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a text file (.txt or .md)");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleClear = () => {
    setText("");
    onTextChange("");
  };

  return (
    <div className="clay-card">
      <h2 className="text-lg font-semibold mb-3">Submit Your Document</h2>

      {/* File Upload Dropzone - Compact */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById("file-input")?.click()}
        className={`
          border-2 border-dashed rounded-xl p-4 text-center cursor-pointer
          transition-all duration-300 mb-3
          ${isDragging
            ? "border-primary bg-primary-alpha"
            : "border-border bg-surface-elevated"
          }
        `}
      >
        <FileText className="w-8 h-8 mx-auto mb-2 text-text-secondary" />
        <p className="font-inter text-sm text-text-secondary mb-1">
          Drop file or click to browse
        </p>
        <p className="font-inter text-xs text-text-tertiary mb-0">
          .txt and .md files
        </p>
        <input
          id="file-input"
          type="file"
          accept=".txt,.md"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Text Input Area - Compact */}
      <div className="mb-3">
        <label
          htmlFor="text-input"
          className="block font-inter text-sm font-medium text-text-primary mb-2"
        >
          Or paste your text:
        </label>
        <textarea
          id="text-input"
          className="clay-input resize-none font-['Merriweather'] text-sm leading-relaxed"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onTextChange(e.target.value);
          }}
          placeholder="Paste your document text here..."
          rows={8}
        />
      </div>

      {/* Word Count and Clear Button */}
      <div className="flex justify-between items-center">
        <div className="font-inter text-xs text-text-secondary">
          <strong>{wordCount}</strong> words
        </div>
        {text && (
          <button
            onClick={handleClear}
            className="clay-button btn-secondary text-xs py-1.5 px-3"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
