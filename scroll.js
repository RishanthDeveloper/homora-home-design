import { ScrollTrigger } from './gsap';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smoothly scroll to a section by selector (e.g. "#styles"). Works with GSAP pinned sections. */
export function scrollToSection(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  // A pinned section is wrapped in a .pin-spacer; measure the spacer so we land at its start.
  const anchor = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
  const top = anchor.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** Recalculate scroll-trigger positions after content height changes. */
export function refreshScrollTriggers() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
