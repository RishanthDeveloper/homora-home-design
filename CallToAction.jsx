import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { scrollToSection } from '../lib/scroll';
import SmartImage from './SmartImage';

const HEADLINE = 'Every Beautiful Home Begins With an Idea.';

export default function CallToAction() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        mediaRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
      gsap.fromTo(
        gsap.utils.toArray('[data-cta-word]', sectionRef.current),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
        }
      );
      gsap.fromTo(
        gsap.utils.toArray('[data-cta-fade]', sectionRef.current),
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.1,
          delay: 0.5,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      aria-labelledby="cta-title"
      className="relative flex min-h-[620px] items-center overflow-hidden bg-charcoal py-28 text-ivory lg:min-h-[92vh]"
    >
      <div ref={mediaRef} className="absolute inset-x-0 -inset-y-[14%]">
        <SmartImage
          photo="1600607687920-4e2a09cf159d"
          alt="Luxurious living room with tall windows and warm evening light"
          sizes="100vw"
          widths={[828, 1280, 1920, 2560]}
          className="h-full w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-charcoal/55" />

      <div className="container-site relative">
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 id="cta-title" className="type-display text-[clamp(2.8rem,7vw,6.75rem)]">
            {HEADLINE.split(' ').map((w, i, arr) => (
              <span key={`${w}-${i}`}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span data-cta-word className="inline-block">
                    {w}
                  </span>
                </span>
                {i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
          <p data-cta-fade className="mx-auto mt-7 max-w-[40ch] text-[16px] leading-[1.7] text-ivory/85 sm:text-[17px]">
            Find the inspiration to make your space extraordinary.
          </p>
          <div data-cta-fade className="mt-10">
            <button type="button" onClick={() => scrollToSection('#styles')} className="btn btn-light">
              Explore Your Style
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
