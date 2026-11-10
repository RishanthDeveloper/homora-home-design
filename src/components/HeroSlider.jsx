import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, EffectFade, Keyboard } from 'swiper/modules';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { heroSlides } from '../data/designs';
import { gsap } from '../lib/gsap';
import { scrollToSection } from '../lib/scroll';
import SmartImage from './SmartImage';

const DELAY = 5000;
const RESUME_AFTER = 8000;
const ease = [0.16, 1, 0.3, 1];

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.45, ease: 'easeIn' } },
};
const word = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 1.15, ease } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const pad = (n) => String(n + 1).padStart(2, '0');

export default function HeroSlider() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const swiperRef = useRef(null);
  const barRefs = useRef([]);
  const resumeTimer = useRef(null);
  const userPaused = useRef(false);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduceMotion = useReducedMotion();
  const slide = heroSlides[index];

  // Progress bars are written directly to the DOM to avoid re-rendering every frame.
  const paintBars = useCallback((active, fill) => {
    barRefs.current.forEach((bar, i) => {
      if (!bar) return;
      const value = i < active ? 1 : i === active ? fill : 0;
      bar.style.transform = `scaleX(${value})`;
    });
  }, []);

  /** Any manual interaction pauses autoplay, which resumes after a short idle period. */
  const handleInteraction = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    swiper.autoplay.stop();
    clearTimeout(resumeTimer.current);
    if (!userPaused.current && !reduceMotion) {
      resumeTimer.current = setTimeout(() => swiper.autoplay?.start(), RESUME_AFTER);
    }
  }, [reduceMotion]);

  const goPrev = () => {
    handleInteraction();
    swiperRef.current?.slidePrev();
  };
  const goNext = () => {
    handleInteraction();
    swiperRef.current?.slideNext();
  };
  const goTo = (i) => {
    handleInteraction();
    swiperRef.current?.slideTo(i);
  };

  const togglePlay = () => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    clearTimeout(resumeTimer.current);
    if (swiper.autoplay.running) {
      userPaused.current = true;
      swiper.autoplay.stop();
    } else {
      userPaused.current = false;
      swiper.autoplay.start();
    }
  };

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  // Gentle parallax as the hero scrolls away.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(mediaRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  const headlineWords = slide.title.split(' ');

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Featured interiors"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-charcoal text-ivory"
    >
      {/* Images */}
      <div ref={mediaRef} className="absolute inset-0">
        <Swiper
          modules={[Autoplay, EffectFade, Keyboard, A11y]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={reduceMotion ? 300 : 1500}
          rewind
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={reduceMotion ? false : { delay: DELAY, disableOnInteraction: false }}
          a11y={{ prevSlideMessage: 'Previous slide', nextSlideMessage: 'Next slide' }}
          onSwiper={(s) => {
            swiperRef.current = s;
            setPlaying(Boolean(s.autoplay?.running));
          }}
          onSlideChange={(s) => {
            setIndex(s.activeIndex);
            paintBars(s.activeIndex, 0);
          }}
          onAutoplayTimeLeft={(s, _time, progress) => paintBars(s.activeIndex, 1 - progress)}
          onAutoplayStart={() => setPlaying(true)}
          onAutoplayStop={() => setPlaying(false)}
          onTouchStart={handleInteraction}
          onKeyPress={handleInteraction}
          className="h-full w-full"
        >
          {heroSlides.map((s, i) => (
            <SwiperSlide key={s.id} className="hero-slide overflow-hidden">
              <div className="hero-media h-full w-full">
                <SmartImage
                  photo={s.photo}
                  alt={s.alt}
                  priority={i === 0}
                  widths={[828, 1280, 1920, 2560]}
                  className="h-full w-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Legibility scrim: darker toward the text, transparent elsewhere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgba(20,19,17,0.72)_0%,rgba(20,19,17,0.25)_45%,rgba(20,19,17,0.35)_100%)]"
      />

      {/* Copy */}
      <div className="container-site pointer-events-none relative z-10 flex h-full flex-col justify-end pb-36 sm:pb-40 lg:pb-44">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={textContainer}
            initial="hidden"
            animate="show"
            exit="exit"
            className="pointer-events-auto max-w-[920px]"
            aria-live="polite"
          >
            <h1 className="type-display text-[clamp(2.9rem,9vw,8.25rem)]">
              {headlineWords.map((w, i) => (
                <span key={`${w}-${i}`}>
                  <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                    <motion.span variants={word} className="inline-block will-change-transform">
                      {w}
                    </motion.span>
                  </span>
                  {i < headlineWords.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[38ch] text-[15px] leading-[1.7] text-ivory/85 sm:text-[17px]"
            >
              {slide.description}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9">
              <button
                type="button"
                onClick={() => scrollToSection(slide.target)}
                className="btn btn-light"
              >
                {slide.cta}
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-site flex items-end justify-between gap-6 pb-8 sm:pb-10">
          <div className="flex min-w-0 flex-1 items-end gap-5 sm:gap-8">
            <p className="font-serif text-2xl leading-none lining-nums tabular-nums sm:text-3xl" aria-hidden="true">
              {pad(index)}
              <span className="mx-2 text-ivory/50">/</span>
              <span className="text-ivory/50">{pad(heroSlides.length - 1)}</span>
            </p>

            <ol className="flex w-full max-w-[420px] gap-3" aria-label="Choose slide">
              {heroSlides.map((s, i) => (
                <li key={s.id} className="flex-1">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className="group block w-full pb-1 pt-3 text-left"
                    aria-label={`Show slide ${i + 1}: ${s.title}`}
                    aria-current={i === index ? 'true' : undefined}
                  >
                    <span
                      className={`mb-2 hidden text-[12px] transition-opacity duration-500 sm:block ${
                        i === index ? 'opacity-100' : 'opacity-55 group-hover:opacity-90'
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="relative block h-px w-full bg-ivory/30">
                      <span
                        ref={(el) => (barRefs.current[i] = el)}
                        className="absolute inset-0 origin-left bg-ivory"
                        style={{ transform: `scaleX(${i < index ? 1 : 0})` }}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {!reduceMotion && (
              <button
                type="button"
                onClick={togglePlay}
                className="icon-btn text-ivory/80 hover:text-ivory"
                aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              >
                {playing ? <Pause size={16} strokeWidth={1.5} /> : <Play size={16} strokeWidth={1.5} />}
              </button>
            )}
            <button
              type="button"
              onClick={goPrev}
              className="icon-btn border border-ivory/40 hover:bg-ivory hover:text-charcoal"
              aria-label="Previous slide"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="icon-btn border border-ivory/40 hover:bg-ivory hover:text-charcoal"
              aria-label="Next slide"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
