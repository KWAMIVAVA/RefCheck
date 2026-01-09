import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const merriweather = Merriweather({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Document Similarity Checker",
  description:
    "A client-side tool for analyzing text similarity between documents. Provides similarity indications to support academic writing and research.",
  keywords: [
    "plagiarism checker",
    "similarity detection",
    "document analysis",
    "academic writing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
