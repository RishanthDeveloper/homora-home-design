import { useEffect } from 'react';

let lockCount = 0;

/** Prevents page scrolling while an overlay (menu, modal, search) is open. */
export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const html = document.documentElement;
    if (lockCount === 0) {
      const scrollbar = window.innerWidth - html.clientWidth;
      html.style.overflow = 'hidden';
      if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
    }
    lockCount += 1;
    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        html.style.overflow = '';
        html.style.paddingRight = '';
      }
    };
  }, [locked]);
}
