import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bookmark, Menu, Search, X } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import useLockBodyScroll from '../hooks/useLockBodyScroll';
import { scrollToSection } from '../lib/scroll';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Explore', href: '#explore' },
  { label: 'Rooms', href: '#showcase' },
  { label: 'Collections', href: '#styles' },
  { label: 'Inspiration', href: '#inspiration' },
];

const ease = [0.16, 1, 0.3, 1];

export default function Navbar({ onOpenSearch, onOpenSaved }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const { count } = useFavorites();

  useLockBodyScroll(menuOpen);

  // Solid background once the page moves past the top of the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link for the section currently in the middle of the viewport.
  useEffect(() => {
    // Observe every top-level section so links un-highlight in sections without a nav entry.
    const sections = [...document.querySelectorAll('main section[id]')];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape or when resizing up to desktop.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const go = (event, href) => {
    event.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(() => scrollToSection(href), 320);
    } else {
      scrollToSection(href);
    }
  };

  const solid = scrolled || menuOpen;
  const tone = solid ? 'text-charcoal' : 'text-ivory';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
          solid
            ? 'bg-ivory/95 shadow-[0_1px_0_rgba(34,33,30,0.08)] backdrop-blur-md'
            : 'bg-transparent'
        } ${tone}`}
      >
        <nav
          aria-label="Primary"
          className={`container-site flex items-center justify-between transition-[height] duration-500 ${
            scrolled ? 'h-16 lg:h-[72px]' : 'h-20 lg:h-24'
          }`}
        >
          <a
            href="#home"
            onClick={(e) => go(e, '#home')}
            className="font-serif text-[22px] font-medium tracking-[0.32em] sm:text-2xl"
            aria-label="HOMORA, back to top"
          >
            HOMORA
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  aria-current={active === link.href ? 'true' : undefined}
                  className={`link-line text-[14px] transition-opacity duration-300 ${
                    active === link.href ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              className="icon-btn hover:opacity-70"
              aria-label="Search designs"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={onOpenSaved}
              className="icon-btn relative hover:opacity-70"
              aria-label={`Saved designs (${count})`}
            >
              <Bookmark size={19} strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-olive px-1 text-[10px] font-semibold text-ivory"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <a
              href="#contact"
              onClick={(e) => go(e, '#contact')}
              className={`btn ml-3 hidden px-6 py-3 lg:inline-flex ${
                solid ? 'btn-dark' : 'btn-ghost-light'
              }`}
            >
              Get Started
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="icon-btn -mr-2 lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-ivory px-5 pb-10 pt-28 sm:px-8 lg:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease }}
                    className={`block py-1 font-serif text-[clamp(2.6rem,11vw,4.5rem)] font-light leading-[1.05] ${
                      active === link.href ? 'text-olive' : 'text-charcoal'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-6 border-t border-charcoal/15 pt-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="type-meta">Imagine Your Space. Design Your Lifestyle.</p>
              <a href="#contact" onClick={(e) => go(e, '#contact')} className="btn btn-dark self-start">
                Get Started
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
