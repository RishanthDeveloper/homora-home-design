import { useLayoutEffect, useRef } from 'react';
import { roomCategories, designs } from '../data/designs';
import { gsap } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';

// Asymmetric editorial layout: wide / narrow, then narrow / wide.
const LAYOUT = [
  { col: 'md:col-span-7', aspect: 'aspect-[4/5] md:aspect-[7/6]', offset: '' },
  { col: 'md:col-span-5', aspect: 'aspect-[4/5]', offset: 'md:mt-40' },
  { col: 'md:col-span-5', aspect: 'aspect-[4/5]', offset: 'md:-mt-10' },
  { col: 'md:col-span-7', aspect: 'aspect-[4/5] md:aspect-[7/6]', offset: 'md:mt-24' },
];

const countFor = (room) => designs.filter((d) => d.room === room).length;

export default function RoomCategories({ onExploreRoom }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-room-card]', sectionRef.current).forEach((card) => {
        const frame = card.querySelector('[data-frame]');
        const inner = card.querySelector('[data-inner]');
        const copy = card.querySelector('[data-copy]');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        });
        tl.fromTo(
          frame,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' }
        )
          .fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0)
          .fromTo(copy, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out' }, 0.35);
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="explore" ref={sectionRef} aria-labelledby="explore-title" className="section-y">
      <div className="container-site">
        <SectionHeading
          id="explore-title"
          title="Explore Spaces That Inspire"
          intro="Start with the room you live in most. Each space opens a curated set of designs you can filter, save and study in detail."
        />

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 md:mt-20 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          {roomCategories.map((cat, i) => {
            const layout = LAYOUT[i];
            const count = countFor(cat.room);
            return (
              <article key={cat.room} data-room-card className={`${layout.col} ${layout.offset}`}>
                <button
                  type="button"
                  onClick={() => onExploreRoom(cat.room)}
                  className="group block w-full text-left"
                  aria-label={`Explore ${cat.room.toLowerCase()} designs`}
                >
                  <div data-frame className={`relative overflow-hidden bg-linen ${layout.aspect}`}>
                    <div data-inner className="h-full w-full">
                      <div className="zoom-img h-full w-full">
                        <SmartImage
                          photo={cat.photo}
                          alt={cat.alt}
                          sizes="(min-width: 768px) 55vw, 100vw"
                          className="h-full w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div data-copy className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="type-h3">{cat.room}</h3>
                      <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.7] text-ink">
                        {cat.description}
                      </p>
                    </div>
                    <span className="mt-2 shrink-0 text-[14px]">
                      <span className="link-solid">Explore {count} designs</span>
                    </span>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
