import { useEffect, useState } from 'react';
import { FALLBACK_PHOTOS, unsplash } from '../data/designs';

const DEFAULT_WIDTHS = [640, 960, 1400, 2000];

/**
 * Responsive Unsplash image with a fade-in on load and a graceful fallback chain
 * if a photo ever fails to load.
 */
export default function SmartImage({
  photo,
  alt,
  className = '',
  sizes = '100vw',
  widths = DEFAULT_WIDTHS,
  priority = false,
  draggable,
}) {
  const isDirect = typeof photo === 'string' && (photo.startsWith('/') || photo.startsWith('http'));
  const sources = isDirect ? [photo] : [photo, ...FALLBACK_PHOTOS.filter((p) => p !== photo)];
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setAttempt(0);
    setLoaded(false);
  }, [photo]);

  if (isDirect) {
    return (
      <img
        src={photo}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable={draggable}
        {...(priority ? { fetchpriority: 'high' } : {})}
        onLoad={() => setLoaded(true)}
        className={`${className} bg-linen object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    );
  }

  if (attempt >= sources.length) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-linen ${className}`}
      >
        <span className="font-serif text-2xl tracking-[0.3em] text-stone-warm">HOMORA</span>
      </div>
    );
  }

  const id = sources[attempt];
  const srcSet = widths.map((w) => `${unsplash(id, w)} ${w}w`).join(', ');

  return (
    <img
      src={unsplash(id, widths[widths.length - 2] || 1400)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={draggable}
      {...(priority ? { fetchpriority: 'high' } : {})}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setLoaded(false);
        setAttempt((a) => a + 1);
      }}
      className={`${className} bg-linen object-cover transition-opacity duration-700 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
