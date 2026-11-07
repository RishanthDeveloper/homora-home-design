import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { showcases } from '../data/designs';
import useMediaQuery from '../hooks/useMediaQuery';
import { gsap, ScrollTrigger } from '../lib/gsap';
import SmartImage from './SmartImage';

const ease = [0.16, 1, 0.3, 1];
const pad = (n) => String(n + 1).padStart(2, '0');

function Details({ item, onView, compact = false }) {
  return (
    <>
      <dl
        className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-charcoal/15 pt-6 text-[14px] ${
          compact ? '[@media(max-height:820px)]:hidden' : ''
        }`}
      >
        <div>
          <dt className="type-meta">Style</dt>
          <dd className="mt-1">{item.style}</dd>
        </div>
        <div>
          <dt className="type-meta">Room</dt>
          <dd className="mt-1">{item.room}</dd>
        </div>
        <div className="col-span-2">
          <dt className="type-meta">Materials</dt>
          <dd className="mt-1">{item.materials.join(', ')}</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={() => onView(item)}
        className={`btn btn-dark mt-9 ${compact ? '[@media(max-height:820px)]:mt-7' : ''}`}
      >
        View Design
      </button>
    </>
  );
}

export default function FeaturedShowcase({ onOpenDesign }) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  // Pin only where there is room for it and motion is welcome.
  const canPin = useMediaQuery('(min-width: 1024px) and (min-height: 620px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const pinned = canPin && !reduceMotion;

  useLayoutEffect(() => {
    if (!pinned) return undefined;
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray('[data-sc-image]', sectionRef.current);
      const inners = gsap.utils.toArray('[data-sc-inner]', sectionRef.current);
      const texts = gsap.utils.toArray('[data-sc-text]', sectionRef.current);
      const last = showcases.length - 1;

      gsap.set(images.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(texts.slice(1), { autoAlpha: 0, y: 50 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * last * 1.15}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          snap: { snapTo: 'labels', duration: { min: 0.25, max: 0.7 }, delay: 0.05, ease: 'power2.inOut' },
          onUpdate: (self) => {
            const next = Math.round(self.progress * last);
            setActive((prev) => (prev === next ? prev : next));
          },
        },
      });

      tl.addLabel('s0').to({}, { duration: 0.3 });
      for (let i = 1; i <= last; i += 1) {
        const at = tl.duration();
        tl.to(texts[i - 1], { autoAlpha: 0, y: -50, duration: 0.35 }, at)
          .to(images[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, at)
          .fromTo(inners[i], { scale: 1.2 }, { scale: 1, duration: 1.2, ease: 'power2.out' }, at)
          .to(inners[i - 1], { scale: 1.06, duration: 1 }, at)
          .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.4 }, at + 0.6)
          .to({}, { duration: 0.3 })
          .addLabel(`s${i}`);
      }
    }, sectionRef);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pinned]);

  const jumpTo = (i) => {
    const st = ScrollTrigger.getAll().find((t) => t.trigger === sectionRef.current && t.pin);
    if (!st) return;
    const y = st.start + (st.end - st.start) * (i / (showcases.length - 1));
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // ------------------------------------------------------------------
  // Stacked layout (mobile, tablet, short screens, reduced motion)
  // ------------------------------------------------------------------
  if (!pinned) {
    return (
      <section id="showcase" aria-labelledby="showcase-title" className="section-y bg-linen">
        <div className="container-site">
          <h2 id="showcase-title" className="type-h2 max-w-[13ch]">
            Designed Around the Way You Live
          </h2>
          <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
            {showcases.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1, ease }}
                className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12"
              >
                <div className={`overflow-hidden md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`}>
                  <SmartImage
                    photo={item.photo}
                    alt={`${item.title} interior`}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="aspect-[4/5] w-full sm:aspect-[16/11]"
                  />
                </div>
                <div className="md:col-span-5">
                  <p className="font-serif text-xl text-olive">
                    {pad(i)} <span className="text-stone-warm">of {pad(showcases.length - 1)}</span>
                  </p>
                  <h3 className="type-h3 mt-3">{item.title}</h3>
                  <p className="type-lead mt-5 max-w-[46ch]">{item.description}</p>
                  <Details item={item} onView={onOpenDesign} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ------------------------------------------------------------------
  // Pinned layout (desktop)
  // ------------------------------------------------------------------
  return (
    <section
      id="showcase"
      ref={sectionRef}
      aria-labelledby="showcase-title"
      className="relative h-screen overflow-hidden bg-linen"
    >
      <div className="container-site grid h-full grid-cols-12 items-center gap-12 pb-10 pt-24 xl:gap-16">
        {/* Image stack */}
        <div className="relative col-span-7 h-[calc(100vh-150px)] max-h-[860px] overflow-hidden bg-sand">
          {showcases.map((item, i) => (
            <div
              key={item.id}
              data-sc-image
              className="absolute inset-0 overflow-hidden"
              style={{ zIndex: i + 1 }}
            >
              <div data-sc-inner className="h-full w-full">
                <SmartImage
                  photo={item.photo}
                  alt={`${item.title} interior`}
                  sizes="58vw"
                  className="h-full w-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Text */}
        <div className="col-span-5 flex h-[calc(100vh-150px)] max-h-[860px] flex-col justify-between gap-6">
          <h2
            id="showcase-title"
            className="font-serif text-[clamp(2.1rem,min(3.6vw,6.2vh),3.9rem)] font-light leading-[0.98]"
          >
            Designed Around the Way You Live
          </h2>

          <div className="stack-grid">
            {showcases.map((item, i) => (
              <div
                key={item.id}
                data-sc-text
                aria-hidden={active !== i}
                className={active === i ? '' : 'pointer-events-none'}
              >
                <h3 className="font-serif text-[clamp(1.9rem,min(2.8vw,5vh),3rem)] leading-none">{item.title}</h3>
                <p className="type-lead mt-5 max-w-[44ch]">{item.description}</p>
                <Details item={item} onView={onOpenDesign} compact />
              </div>
            ))}
          </div>

          <ol className="flex gap-6 border-t border-charcoal/15 pt-5" aria-label="Showcase progress">
            {showcases.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={active === i ? 'step' : undefined}
                  className={`text-left text-[13px] transition-colors duration-500 ${
                    active === i ? 'text-charcoal' : 'text-stone-warm hover:text-charcoal'
                  }`}
                >
                  <span className="mr-2 font-serif text-lg">{pad(i)}</span>
                  {item.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
