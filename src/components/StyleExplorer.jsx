import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { designs, styleCollections, STYLES } from '../data/designs';
import { gsap } from '../lib/gsap';
import { refreshScrollTriggers } from '../lib/scroll';
import DesignCard from './DesignCard';
import SmartImage from './SmartImage';

const ease = [0.16, 1, 0.3, 1];
const countFor = (style) => designs.filter((d) => d.style === style).length;

export default function StyleExplorer({ onOpenDesign }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);
  const [activeStyle, setActiveStyle] = useState('All');

  // "All" shows one design per style; a selected style shows every design in it.
  const samples = useMemo(() => {
    if (activeStyle === 'All') {
      return STYLES.map((s) => designs.find((d) => d.style === s)).filter(Boolean);
    }
    return designs.filter((d) => d.style === activeStyle);
  }, [activeStyle]);

  useEffect(() => {
    refreshScrollTriggers();
  }, [samples.length]);

  // Entrance: cards slide in from the right as the track enters the viewport.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        gsap.utils.toArray('[data-style-card]', sectionRef.current),
        { x: 120, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 1.3,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: trackRef.current, start: 'top 85%', once: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  const updateProgress = () => {
    const el = trackRef.current;
    if (!el || !progressRef.current) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    progressRef.current.style.transform = `scaleX(${Math.max(0.08, p)})`;
  };

  useEffect(() => {
    updateProgress();
    window.addEventListener('resize', updateProgress);
    return () => window.removeEventListener('resize', updateProgress);
  }, []);

  // Mouse drag-to-scroll. Touch devices use native horizontal scrolling.
  const onPointerDown = (e) => {
    drag.current.moved = 0;
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { active: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: 0 };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved > 5 && !dragging) setDragging(true);
    trackRef.current.scrollLeft = d.startScroll - dx;
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    const card = el?.querySelector('[data-style-card]');
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const selectStyle = (name) => {
    if (drag.current.moved > 6) return; // it was a drag, not a click
    setActiveStyle((prev) => (prev === name ? 'All' : name));
  };

  return (
    <section id="styles" ref={sectionRef} aria-labelledby="styles-title" className="section-y overflow-hidden">
      <div className="container-site">
        <div className="grid gap-6 border-b border-charcoal/15 pb-10 md:grid-cols-12 md:items-end md:gap-10 lg:pb-14">
          <h2 id="styles-title" className="type-h2 max-w-[14ch] md:col-span-7">
            Find Your Design Language
          </h2>
          <div className="md:col-span-5 md:justify-self-end">
            <p className="max-w-[42ch] text-[15px] leading-[1.7] text-ink">
              Eight distinct design aesthetics with their core color palettes. Scroll through the styles and filter
              designs by the look you prefer.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className="icon-btn border border-charcoal/30 hover:bg-charcoal hover:text-ivory"
                aria-label="Scroll styles left"
              >
                <ArrowLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className="icon-btn border border-charcoal/30 hover:bg-charcoal hover:text-ivory"
                aria-label="Scroll styles right"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal track, aligned to the content column on wide screens */}
      <div
        ref={trackRef}
        onScroll={updateProgress}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`no-scrollbar mt-12 flex select-none gap-5 overflow-x-auto pb-2 lg:mt-16 ${
          dragging ? 'cursor-grabbing' : 'cursor-grab snap-x snap-mandatory'
        } px-5 sm:px-8 lg:px-[max(3rem,calc((100vw-1440px)/2+3rem))]`}
        style={{ scrollPaddingInline: 'max(1.25rem, calc((100vw - 1440px) / 2 + 3rem))' }}
        role="list"
        aria-label="Design styles"
      >
        {styleCollections.map((style) => {
          const selected = activeStyle === style.name;
          return (
            <div
              key={style.name}
              role="listitem"
              data-style-card
              className="w-[74vw] shrink-0 snap-start sm:w-[44vw] md:w-[34vw] lg:w-[24vw] lg:max-w-[340px]"
            >
              <button
                type="button"
                onClick={() => selectStyle(style.name)}
                aria-pressed={selected}
                className="group block w-full text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-linen">
                  <div
                    className={`zoom-img h-full w-full transition-[filter] duration-700 ${
                      activeStyle !== 'All' && !selected ? 'grayscale-[60%]' : ''
                    }`}
                  >
                    <SmartImage
                      photo={style.photo}
                      alt={`${style.name} interior style`}
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 44vw, 74vw"
                      draggable={false}
                      className="pointer-events-none h-full w-full"
                    />
                  </div>
                  <AnimatePresence>
                    {selected && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.4, ease }}
                        className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center bg-ivory text-charcoal"
                      >
                        <Check size={16} strokeWidth={2} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="relative mt-5 pb-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-[1.9rem] leading-none">{style.name}</h3>
                    <span className="type-meta">{countFor(style.name)} designs</span>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.6] text-ink">{style.blurb}</p>
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-olive transition-transform duration-700 ease-out-expo ${
                      selected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-[0.25]'
                    }`}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <div className="container-site mt-6">
        <div className="h-px w-full bg-charcoal/15">
          <div ref={progressRef} className="h-px origin-left bg-charcoal transition-transform duration-200" />
        </div>
      </div>

      {/* Filtered sample designs */}
      <div className="container-site mt-20 lg:mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="font-serif text-[1.75rem] leading-tight" aria-live="polite">
            {activeStyle === 'All'
              ? 'One design from every style'
              : `${samples.length} ${activeStyle} designs`}
          </p>
          {activeStyle !== 'All' && (
            <button type="button" onClick={() => setActiveStyle('All')} className="link-solid text-[14px]">
              Show all styles
            </button>
          )}
        </div>

        <motion.div layout className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {samples.map((design) => (
              <motion.div
                key={design.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease }}
              >
                <DesignCard
                  design={design}
                  ratio="portrait"
                  onOpen={onOpenDesign}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
