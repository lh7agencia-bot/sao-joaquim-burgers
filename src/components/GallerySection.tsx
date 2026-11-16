import { ChevronLeft, ChevronRight, Expand, Image as ImageIcon, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY_PHOTOS, GalleryPhoto } from '../data/restaurantData';
import { ScrollReveal } from './ScrollReveal';

interface LazyGalleryImageProps {
  photo: GalleryPhoto;
  fitMode?: 'cover' | 'contain';
  onFailed: (id: string) => void;
  hasFailed: boolean;
}

function LazyGalleryImage({
  photo,
  fitMode = 'cover',
  onFailed,
  hasFailed,
}: LazyGalleryImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '120px 0px', threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (hasFailed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-sm text-[#B6AFA5] bg-[#161411]">
        <ImageIcon className="w-6 h-6 text-[#D4AF37] mb-2" aria-hidden="true" />
        <span>{photo.title}</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#161411]">
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#1E1B18] via-[#171512] to-[#11100E] animate-pulse flex items-center justify-center"
        >
          <ImageIcon className="w-7 h-7 text-[#2D2924]" />
        </div>
      )}

      {shouldLoad && (
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => onFailed(photo.id)}
          className={`w-full h-full ${
            fitMode === 'contain' ? 'object-contain p-2' : 'object-cover'
          } transition-[opacity,transform] duration-300 ease-out group-hover:scale-[1.03] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}

function preloadImage(src: string) {
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
}

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const activePhoto: GalleryPhoto | null =
    activeIndex !== null ? GALLERY_PHOTOS[activeIndex] : null;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length));
  }, []);

  // Preload adjacent photos when Lightbox is open for instantaneous navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const nextIdx = (activeIndex + 1) % GALLERY_PHOTOS.length;
    const prevIdx = (activeIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    preloadImage(GALLERY_PHOTOS[nextIdx].src);
    preloadImage(GALLERY_PHOTOS[prevIdx].src);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  const handleImageError = useCallback((id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  }, []);

  const row1Photos = [GALLERY_PHOTOS[0], GALLERY_PHOTOS[2]]; // Both landscape: 16:9 & 4:3
  const row2Photos = [GALLERY_PHOTOS[1], GALLERY_PHOTOS[3]]; // Both portrait: 3:4 & 9:16

  return (
    <section id="galeria" className="py-16 sm:py-24 border-b border-[#2D2924]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl pb-8 border-b border-[#2D2924]">
            <p className="text-xs sm:text-sm font-semibold text-[#D4AF37]">
              Galeria de Fotos
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F2EC] mt-2">
              Registros reais da nossa chapa e balcão
            </h2>
            <p className="text-sm sm:text-base text-[#B6AFA5] mt-3 leading-relaxed">
              Fotos autênticas dos nossos hambúrgueres, da equipe em ação na Liberdade e do
              cardápio oficial. Clique em qualquer imagem para ampliar.
            </p>
          </div>
        </ScrollReveal>

        {/* Balanced Responsive Gallery: Landscape Row + Portrait Row */}
        <div className="mt-10 space-y-6">
          {/* Row 1: Two landscape photos in matched 4:3 frames */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {row1Photos.map((photo, idx) => {
              const globalIdx = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
              return (
                <ScrollReveal key={photo.id} delay={idx * 0.08} className="h-full">
                  <figure className="h-full flex flex-col bg-[#1A1815] border border-[#2D2924] rounded-xl overflow-hidden group">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(globalIdx)}
                      onMouseEnter={() => preloadImage(photo.src)}
                      aria-label={`Ampliar foto: ${photo.title}`}
                      className="relative block w-full aspect-[16/10] overflow-hidden bg-[#11100E] focus-visible:outline-2 focus-visible:outline-[#FF6B35]"
                    >
                      <LazyGalleryImage
                        photo={photo}
                        fitMode="cover"
                        onFailed={handleImageError}
                        hasFailed={!!failedImages[photo.id]}
                      />

                      <span
                        aria-hidden="true"
                        className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-[#11100E]/80 border border-[#2D2924] text-[#F6F2EC] flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:border-[#FF6B35] transition-all"
                      >
                        <Expand className="w-4 h-4" />
                      </span>
                    </button>

                    <figcaption className="flex-1 p-5 border-t border-[#2D2924]">
                      <p className="text-xs font-medium text-[#D4AF37]">{photo.category}</p>
                      <h3 className="font-display text-lg font-bold text-[#F6F2EC] mt-1">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-[#B6AFA5] mt-1.5 leading-relaxed">
                        {photo.caption}
                      </p>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Row 2: Two portrait photos in matched 3:4 frames (printed menu uses object-contain to keep 100% legible) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {row2Photos.map((photo, idx) => {
              const globalIdx = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
              const isPrintedMenu = photo.id === 'foto-cardapio-impresso';
              return (
                <ScrollReveal key={photo.id} delay={(idx + 1) * 0.08} className="h-full">
                  <figure className="h-full flex flex-col bg-[#1A1815] border border-[#2D2924] rounded-xl overflow-hidden group">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(globalIdx)}
                      onMouseEnter={() => preloadImage(photo.src)}
                      aria-label={`Ampliar foto: ${photo.title}`}
                      className="relative block w-full aspect-[4/4] sm:aspect-[3/4] max-h-[540px] overflow-hidden bg-[#13110F] focus-visible:outline-2 focus-visible:outline-[#FF6B35]"
                    >
                      <LazyGalleryImage
                        photo={photo}
                        fitMode={isPrintedMenu ? 'contain' : 'cover'}
                        onFailed={handleImageError}
                        hasFailed={!!failedImages[photo.id]}
                      />

                      <span
                        aria-hidden="true"
                        className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-[#11100E]/80 border border-[#2D2924] text-[#F6F2EC] flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:border-[#FF6B35] transition-all"
                      >
                        <Expand className="w-4 h-4" />
                      </span>
                    </button>

                    <figcaption className="flex-1 p-5 border-t border-[#2D2924]">
                      <p className="text-xs font-medium text-[#D4AF37]">{photo.category}</p>
                      <h3 className="font-display text-lg font-bold text-[#F6F2EC] mt-1">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-[#B6AFA5] mt-1.5 leading-relaxed">
                        {photo.caption}
                      </p>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fast Lightbox Modal */}
      {activePhoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visualizador de foto: ${activePhoto.title}`}
          className="fixed inset-0 z-50 bg-[#0A0908]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl bg-[#1A1815] border border-[#2D2924] rounded-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 border-b border-[#2D2924] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#B6AFA5] min-w-0">
                <span className="font-semibold text-[#D4AF37] shrink-0">{activePhoto.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#F6F2EC] font-medium truncate">{activePhoto.title}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums shrink-0">
                  {activeIndex + 1} / {GALLERY_PHOTOS.length}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Fechar visualização ampliada"
                className="w-10 h-10 shrink-0 rounded-lg border border-[#2D2924] text-[#F6F2EC] hover:border-[#FF6B35] hover:text-[#FF6B35] inline-flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 bg-[#11100E] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                width={activePhoto.width}
                height={activePhoto.height}
                decoding="async"
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg"
              />

              <button
                type="button"
                onClick={showPrev}
                aria-label="Foto anterior"
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-lg bg-[#11100E]/85 border border-[#2D2924] text-[#F6F2EC] hover:border-[#FF6B35] hover:text-[#FF6B35] inline-flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Próxima foto"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-lg bg-[#11100E]/85 border border-[#2D2924] text-[#F6F2EC] hover:border-[#FF6B35] hover:text-[#FF6B35] inline-flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 py-4 border-t border-[#2D2924] text-sm text-[#B6AFA5]">
              {activePhoto.caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
