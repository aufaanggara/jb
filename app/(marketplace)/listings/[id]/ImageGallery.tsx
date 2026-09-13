"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, ImageIcon } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="text-center">
            <ImageIcon size={48} className="text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-400 font-medium">Belum ada foto</p>
          </div>
        </div>
      </div>
    );
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      {/* Main Gallery Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Main Image */}
        <div className="relative group">
          <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
            <Image
              src={images[activeIndex]}
              alt={`${title} - Screenshot ${activeIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 640px"
              priority
            />

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

            {/* Image counter badge */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <ImageIcon size={12} />
              {activeIndex + 1} / {images.length}
            </div>

            {/* Zoom button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/80 cursor-pointer"
              aria-label="Lihat fullscreen"
            >
              <ZoomIn size={16} />
            </button>

            {/* Nav Arrows (only if multiple images) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg text-slate-700 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white cursor-pointer"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg text-slate-700 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white cursor-pointer"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail Strip (only if multiple images) */}
        {images.length > 1 && (
          <div className="p-3 border-t border-slate-100 bg-slate-50/50">
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    i === activeIndex
                      ? "border-blue-500 ring-2 ring-blue-200 shadow-md"
                      : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors cursor-pointer z-10"
            aria-label="Tutup"
          >
            <X size={22} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1.5 rounded-lg">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Lightbox image */}
          <div
            className="relative w-full max-w-4xl mx-4 aspect-[16/9]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} - Screenshot ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Nav Arrows in lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer"
                aria-label="Foto berikutnya"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
