import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { allDesigns } from '../data/designs';
import useDialog from '../hooks/useDialog';
import useLockBodyScroll from '../hooks/useLockBodyScroll';
import SmartImage from './SmartImage';

const ease = [0.16, 1, 0.3, 1];
const SUGGESTIONS = ['Japandi', 'Kitchen', 'Luxury bathroom', 'Minimalist', 'Oak', 'Industrial'];

const haystack = (d) =>
  [d.title, d.room, d.style, d.description, d.studio, ...(d.materials || [])].join(' ').toLowerCase();

export function searchDesigns(query) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return allDesigns
    .map((d) => {
      const text = haystack(d);
      if (!terms.every((t) => text.includes(t))) return null;
      // Rank title and style matches above description matches.
      const score = terms.reduce(
        (s, t) =>
          s + (d.title.toLowerCase().includes(t) ? 3 : 0) + (d.style.toLowerCase().includes(t) ? 2 : 0) +
          (d.room.toLowerCase().includes(t) ? 2 : 0) + 1,
        0
      );
      return { d, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.d);
}

export default function SearchOverlay({ open, onClose, onOpenDesign }) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const results = useMemo(() => searchDesigns(query), [query]);
  const dialogRef = useDialog(open, onClose);
  useLockBodyScroll(open);

  useEffect(() => setCursor(0), [query]);
  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const choose = (design) => {
    onClose();
    // Let the overlay start closing before the detail view opens.
    setTimeout(() => onOpenDesign(design), 180);
  };

  const onKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (c + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(results[cursor]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Search designs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-ivory"
        >
          <div className="container-site pb-16 pt-6 sm:pt-8">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="icon-btn hover:bg-charcoal hover:text-ivory"
                aria-label="Close search"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
              className="mx-auto mt-6 max-w-[980px] sm:mt-12"
            >
              <label htmlFor="site-search" className="type-meta">
                Search {allDesigns.length} designs by room, style, material or name
              </label>
              <div className="mt-3 flex items-center gap-4 border-b border-charcoal pb-3">
                <Search size={26} strokeWidth={1.25} className="shrink-0 text-stone-warm" />
                <input
                  id="site-search"
                  data-autofocus
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Try “oak kitchen”"
                  autoComplete="off"
                  aria-controls="search-results"
                  aria-activedescendant={results[cursor] ? `result-${results[cursor].id}` : undefined}
                  className="w-full min-w-0 bg-transparent font-serif text-[clamp(2rem,6vw,4rem)] font-light leading-tight placeholder:text-stone-warm/60 focus:outline-none"
                />
              </div>

              {!query && (
                <div className="mt-8">
                  <p className="type-meta">Popular searches</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="border border-charcoal/20 px-4 py-2 text-[14px] transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query && (
                <div className="mt-8">
                  <p className="type-meta" aria-live="polite">
                    {results.length
                      ? `${results.length} ${results.length === 1 ? 'design' : 'designs'} found`
                      : `No designs match “${query}”. Try a room such as kitchen, or a style such as Japandi.`}
                  </p>
                  <ul id="search-results" role="listbox" className="mt-4 divide-y divide-charcoal/10">
                    {results.map((d, i) => (
                      <li key={d.id} id={`result-${d.id}`} role="option" aria-selected={i === cursor}>
                        <button
                          type="button"
                          onClick={() => choose(d)}
                          onMouseEnter={() => setCursor(i)}
                          className={`flex w-full items-center gap-4 py-4 text-left transition-colors sm:gap-6 ${
                            i === cursor ? 'bg-linen/70' : ''
                          }`}
                        >
                          <div className="h-16 w-20 shrink-0 overflow-hidden bg-linen sm:h-20 sm:w-28">
                            <SmartImage photo={d.photo} alt="" sizes="112px" widths={[240, 400]} className="h-full w-full" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-serif text-[1.5rem] leading-tight sm:text-[1.75rem]">{d.title}</p>
                            <p className="type-meta mt-1">
                              {d.style} {d.room.toLowerCase()}, {d.area}
                            </p>
                          </div>
                          <span className="hidden pr-2 text-[13px] text-stone-warm sm:block">View</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
