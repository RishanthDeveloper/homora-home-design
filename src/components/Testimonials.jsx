import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, EffectFade, Keyboard } from 'swiper/modules';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { testimonials } from '../data/testimonials';

const pad = (n) => String(n + 1).padStart(2, '0');

export default function Testimonials() {
  const swiperRef = useRef(null);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section-y bg-charcoal text-ivory">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 id="testimonials-title" className="type-h2 max-w-[10ch]">
            Homes, in their own words
          </h2>
          <p className="mt-6 max-w-[34ch] text-[14px] leading-[1.7] text-ivory/60">
            Illustrative testimonials. The people, names and quotes shown here are fictional samples for this
            demonstration site.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                className="icon-btn border border-ivory/30 hover:bg-ivory hover:text-charcoal"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                className="icon-btn border border-ivory/30 hover:bg-ivory hover:text-charcoal"
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </div>
            <p className="font-serif text-xl lining-nums tabular-nums" aria-live="polite">
              {pad(index)} <span className="text-ivory/40">/ {pad(testimonials.length - 1)}</span>
            </p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <Swiper
            modules={[A11y, Autoplay, EffectFade, Keyboard]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={reduceMotion ? 200 : 900}
            loop
            autoHeight
            keyboard={{ enabled: true, onlyInViewport: true }}
            autoplay={reduceMotion ? false : { delay: 7000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            onSwiper={(s) => (swiperRef.current = s)}
            onSlideChange={(s) => setIndex(s.realIndex)}
            className="!overflow-hidden"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="bg-charcoal">
                <figure>
                  <blockquote className="font-serif text-[clamp(1.75rem,3.3vw,3.1rem)] font-light italic leading-[1.18]">
                    <p>“{t.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-4 border-t border-ivory/15 pt-8">
                    <img
                      src={t.avatar}
                      alt={`Portrait used for the fictional customer ${t.name}`}
                      loading="lazy"
                      className="h-14 w-14 rounded-full bg-ink object-cover"
                    />
                    <div>
                      <p className="text-[15px] font-medium">{t.name}</p>
                      <p className="mt-0.5 text-[13px] text-ivory/60">
                        {t.project}, {t.location}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-10 flex gap-2" role="group" aria-label="Choose testimonial">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => swiperRef.current?.slideToLoop(i)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={i === index ? 'true' : undefined}
                className="group py-3"
              >
                <span
                  className={`block h-px transition-all duration-700 ease-out-expo ${
                    i === index ? 'w-14 bg-ivory' : 'w-7 bg-ivory/30 group-hover:bg-ivory/60'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
