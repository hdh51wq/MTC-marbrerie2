"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { BookOpen, Download, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  pdfUrl?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class CatalogueErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Catalogue FlipBook encountered an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const { pdfUrl = "/catalogue.pdf" } = this.props;
      return (
        <div className="w-full max-w-xl mx-auto my-8 p-8 rounded-2xl bg-white/90 backdrop-blur-md border border-brand-orange/20 shadow-xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mx-auto mb-4">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl text-brand-dark font-medium mb-2">
            Catalogue Marbrerie Tunis Carthage
          </h3>
          <p className="text-neutral-600 text-sm mb-6 max-w-md mx-auto">
            Le catalogue est disponible en consultation directe ou en téléchargement haute définition.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Réessayer
            </button>
            <a
              href={pdfUrl}
              download="Catalogue-Marbrerie-Tunis-Carthage.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange text-brand-dark text-sm font-bold hover:bg-orange-400 shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              Télécharger le PDF
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
