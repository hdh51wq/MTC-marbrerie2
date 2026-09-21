"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import HTMLFlipBook from "react-pageflip";
import FlipBookPage from "./FlipBookPage";
import FlipBookControls from "./FlipBookControls";
import { useTranslations } from "next-intl";
import { BookOpen, Sparkles } from "lucide-react";

// Initialize PDF.js worker
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

type FlipBookProps = {
  pdfUrl?: string;
};

export default function FlipBook({ pdfUrl = "/catalogue.pdf" }: FlipBookProps) {
  const t = useTranslations("catalogue");

  // Document state
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // UI state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [bookDimensions, setBookDimensions] = useState({
    width: 440,
    height: 620,
    isMobile: false,
  });

  // Refs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef<boolean>(false);

  // Load PDF Document manually via pdfjs
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setLoadError(null);

    if (typeof window !== "undefined") {
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    }

    const loadingTask = pdfjs.getDocument(pdfUrl);

    loadingTask.promise
      .then((doc) => {
        if (!isCancelled) {
          setPdfDocument(doc);
          setNumPages(doc.numPages);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error("PDF load error:", err);
          setLoadError(err?.message || "Failed to load catalogue PDF");
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
      try {
        loadingTask.destroy();
      } catch {
        // ignore destroy error
      }
    };
  }, [pdfUrl]);

  // Initialize Sound Effect
  useEffect(() => {
    try {
      const audio = new Audio("/sounds/page-flip.mp3");
      audio.volume = 0.55;
      audio.preload = "auto";
      audioRef.current = audio;
    } catch {
      // Audio initialization fallback
    }

    const handleUserInteraction = () => {
      userInteractedRef.current = true;
    };

    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("keydown", handleUserInteraction, { once: true });
    window.addEventListener("touchstart", handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  // Responsive Book Sizing targeting ~70% available page width
  const updateDimensions = useCallback(() => {
    if (typeof window === "undefined") return;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Aspect ratio of standard catalogue page ~ 1 : 1.414 (A4)
    if (screenWidth < 640) {
      // Mobile Single Page (~85-90% screen width)
      const w = Math.min(Math.floor(screenWidth * 0.88), 380);
      const maxH = screenHeight - 200;
      const h = Math.min(Math.round(w * 1.414), maxH);
      setBookDimensions({ width: w, height: h, isMobile: true });
    } else if (screenWidth < 1024) {
      // Tablet Dual Page (~72% screen width spread)
      const targetSpread = Math.floor(screenWidth * 0.72);
      const targetW = Math.floor(targetSpread / 2);
      const maxH = screenHeight - 220;
      let h = Math.round(targetW * 1.414);
      let w = targetW;
      if (h > maxH) {
        h = maxH;
        w = Math.round(h / 1.414);
      }
      setBookDimensions({ width: Math.min(w, 420), height: h, isMobile: false });
    } else {
      // Desktop Luxury Spread (~70% screen width spread)
      const targetSpread = Math.min(Math.floor(screenWidth * 0.70), 1260);
      const targetW = Math.floor(targetSpread / 2);
      const maxH = screenHeight - 220;
      let h = Math.round(targetW * 1.414);
      let w = targetW;
      if (h > maxH) {
        h = Math.min(maxH, 820);
        w = Math.round(h / 1.414);
      }
      setBookDimensions({ width: Math.min(w, 630), height: Math.min(h, 820), isMobile: false });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Play Page Turn Sound Effect
  const playFlipSound = useCallback(() => {
    if (!soundEnabled || !audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser audio policy prevented auto play
        });
      }
    } catch {
      // Ignore audio playback issues
    }
  }, [soundEnabled]);

  // Handle Flip Event from react-pageflip
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFlip = useCallback((e: any) => {
    if (e && typeof e.data === "number") {
      setCurrentPage(e.data);
    }
    playFlipSound();
  }, [playFlipSound]);

  // Navigation handlers
  const handlePrevPage = () => {
    if (flipBookRef.current) {
      try {
        flipBookRef.current.pageFlip().flipPrev();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleNextPage = () => {
    if (flipBookRef.current) {
      try {
        flipBookRef.current.pageFlip().flipNext();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handlePageJump = (pageIdx: number) => {
    if (flipBookRef.current && pageIdx >= 0 && pageIdx < numPages) {
      try {
        flipBookRef.current.pageFlip().turnToPage(pageIdx);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleToggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen toggle failed:", err);
    }
  };

  const handleZoomIn = () => setZoomScale((s) => Math.min(s + 0.15, 1.5));
  const handleZoomOut = () => setZoomScale((s) => Math.max(s - 0.15, 0.8));
  const handleResetZoom = () => setZoomScale(1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === "m" || e.key === "M") {
        handleToggleSound();
      } else if (e.key === "f" || e.key === "F") {
        handleToggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col items-center justify-center transition-colors duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-brand-dark/95 backdrop-blur-xl p-4 sm:p-8 overflow-y-auto"
          : "relative my-4"
      }`}
    >
      {/* Main Flipbook Showcase */}
      {isLoading ? (
        <div className="w-full max-w-3xl min-h-[460px] sm:min-h-[580px] rounded-2xl bg-white/70 backdrop-blur-md border border-black/[0.06] shadow-xl flex flex-col items-center justify-center p-8 text-center animate-pulse">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <BookOpen className="w-8 h-8 animate-bounce" />
            </div>
            <Sparkles className="w-5 h-5 text-brand-orange absolute -top-1 -right-1 animate-spin" />
          </div>
          <h3 className="font-serif text-2xl text-brand-dark font-normal mb-2">
            {t("loading")}
          </h3>
          <p className="text-neutral-500 text-sm max-w-md font-sans">
            {t("loadingProgress")}
          </p>
          {/* Animated loading bar */}
          <div className="w-48 h-1.5 bg-neutral-200 rounded-full overflow-hidden mt-6">
            <div className="w-full h-full bg-brand-orange origin-left animate-[loading-bar_1.5s_infinite_ease-in-out]" />
          </div>
        </div>
      ) : loadError ? (
        <div className="w-full max-w-xl p-8 rounded-2xl bg-red-50 border border-red-200 text-center text-red-700">
          <p className="font-serif text-xl mb-3">Erreur de chargement du catalogue</p>
          <p className="text-sm text-red-600 mb-6">{loadError}</p>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange text-white rounded-xl text-sm font-medium hover:bg-brand-dark transition-colors"
          >
            Télécharger le PDF directement
          </a>
        </div>
      ) : numPages > 0 && pdfDocument ? (
        <div className="relative flex flex-col items-center justify-center w-full">
          {/* Flipbook Container with realistic book shadow */}
          <div
            className="relative flex items-center justify-center transition-transform duration-300 ease-out origin-center"
            style={{
              transform: `scale(${zoomScale})`,
            }}
          >
            {/* Realistic Physical Book Depth Shadow */}
            <div
              className="absolute inset-0 -m-3 sm:-m-5 rounded-2xl bg-gradient-to-br from-black/10 via-black/20 to-black/35 blur-xl pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* StPageFlip HTMLFlipBook Component */}
            <HTMLFlipBook
              ref={flipBookRef}
              width={bookDimensions.width}
              height={bookDimensions.height}
              size="stretch"
              minWidth={260}
              maxWidth={660}
              minHeight={360}
              maxHeight={880}
              maxShadowOpacity={0.45}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={handleFlip}
              className="shadow-2xl rounded-lg overflow-hidden select-none bg-neutral-900 cursor-grab active:cursor-grabbing"
              style={{ margin: "0 auto" }}
              usePortrait={bookDimensions.isMobile}
              startPage={0}
              drawShadow={true}
              flippingTime={700}
              startZIndex={0}
              autoSize={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {Array.from({ length: numPages }, (_, index) => {
                const pageNum = index + 1;
                const isCover = pageNum === 1;
                const isBackCover = pageNum === numPages;
                const isEven = pageNum % 2 === 0;

                return (
                  <FlipBookPage
                    key={`page-${pageNum}`}
                    pageNumber={pageNum}
                    pdfDocument={pdfDocument}
                    totalCount={numPages}
                    width={bookDimensions.width}
                    height={bookDimensions.height}
                    isCover={isCover}
                    isBackCover={isBackCover}
                    isEven={isEven}
                  />
                );
              })}
            </HTMLFlipBook>
          </div>

          {/* Luxury Controls Toolbar */}
          <FlipBookControls
            currentPage={currentPage}
            totalPages={numPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onPageJump={handlePageJump}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            zoomScale={zoomScale}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
          />
        </div>
      ) : null}
    </div>
  );
}
