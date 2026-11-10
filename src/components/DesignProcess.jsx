import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { scrollToSection } from '../lib/scroll';
import SmartImage from './SmartImage';

const STEPS = [
  {
    title: 'Discover',
    text: 'Explore design ideas and styles.',
    detail: 'Browse rooms, compare eight design languages and notice what you keep returning to.',
    photo: '1600573472550-8090b5e0745e',
    alt: 'Open living space with natural light and layered textures',
    offset: '',
  },
  {
    title: 'Imagine',
    text: 'Find the perfect inspiration for your rooms.',
    detail: 'Save designs, study their materials and palettes, and shape a clear picture of each room.',
    photo: '1615529182904-14819c35db37',
    alt: 'Detail of a styled interior with soft furnishings and warm tones',
    offset: 'lg:mt-24',
  },
  {
    title: 'Create',
    text: 'Start planning your dream space.',
    detail: 'Take your saved collection to a designer, a builder or a weekend project with confidence.',
    photo: '1567767292278-a4f21aa2d36e',
    alt: 'Finished living room with plants, timber and a comfortable sofa',
    offset: 'lg:mt-48',
  },
];

export default function DesignProcess() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const steps = () => gsap.utils.toArray('[data-step]', sectionRef.current);

    mm.add(
      {
        desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, reduce } = context.conditions;

        if (reduce) {
          gsap.set(lineRef.current, { scaleX: 1, scaleY: 1 });
          steps().forEach((s) => s.classList.add('is-active'));
          return;
        }

        // The connecting line draws with scroll: horizontally on desktop, vertically on mobile.
        gsap.fromTo(
          lineRef.current,
          desktop ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 },
          {
            ...(desktop ? { scaleX: 1 } : { scaleY: 1 }),
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-steps]',
              start: desktop ? 'top 70%' : 'top 60%',
              end: desktop ? 'bottom 75%' : 'bottom 60%',
              scrub: 0.6,
            },
          }
        );

        steps().forEach((step) => {
          const frame = step.querySelector('[data-step-frame]');
          const inner = step.querySelector('[data-step-inner]');
          gsap
            .timeline({ scrollTrigger: { trigger: step, start: 'top 75%', once: true } })
            .fromTo(frame, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' })
            .fromTo(inner, { scale: 1.2 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0);

          gsap.to(step, {
            scrollTrigger: {
              trigger: step,
              start: desktop ? 'top 70%' : 'top 60%',
              toggleClass: { targets: step, className: 'is-active' },
            },
          });
        });
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" aria-labelledby="process-title" className="section-y bg-ivory">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <h2 id="process-title" className="type-h2 max-w-[15ch] md:col-span-8">
            From Inspiration to Your Dream Home
          </h2>
          <p className="max-w-[40ch] text-[15px] leading-[1.7] text-ink md:col-span-4 md:justify-self-end">
            Three simple steps take you from a feeling to a plan you can act on.
          </p>
        </div>

        <div data-steps className="relative mt-16 lg:mt-24">
          {/* Track + animated line */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-[14px] w-px bg-charcoal/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-auto"
          >
            <div ref={lineRef} className="h-full w-full origin-top bg-olive lg:origin-left" />
          </div>

          <ol className="grid gap-16 lg:grid-cols-3 lg:gap-10 xl:gap-14">
            {STEPS.map((step, i) => (
              <li key={step.title} data-step className="group relative pl-10 lg:pl-0">
                {/* Node + number on the line */}
                <div className="absolute left-0 top-[7px] flex items-center lg:static lg:mb-10">
                  <span className="relative block h-[15px] w-[15px] -translate-y-1/2 border border-charcoal/40 bg-ivory transition-colors duration-700 group-[.is-active]:border-olive group-[.is-active]:bg-olive lg:translate-y-0" />
                </div>
                <p className="font-serif text-[1.35rem] text-stone-warm transition-colors duration-700 group-[.is-active]:text-olive">
                  Step {i + 1}
                </p>
                <h3 className="type-display mt-1 text-[clamp(3rem,5vw,4.5rem)]">{step.title}</h3>
                <p className="mt-3 text-[17px] text-charcoal">{step.text}</p>
                <p className="mt-2 max-w-[38ch] text-[14px] leading-[1.7] text-ink">{step.detail}</p>

                <div data-step-frame className={`mt-8 overflow-hidden bg-linen ${step.offset}`}>
                  <div data-step-inner className="aspect-[4/5]">
                    <SmartImage
                      photo={step.photo}
                      alt={step.alt}
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="h-full w-full"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex justify-start lg:mt-20">
          <button type="button" onClick={() => scrollToSection('#explore')} className="btn btn-dark">
            Start Discovering
          </button>
        </div>
      </div>
    </section>
  );
}
