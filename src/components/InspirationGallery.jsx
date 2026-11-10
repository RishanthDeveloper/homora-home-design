import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { designs, ROOMS } from '../data/designs';
import useMediaQuery from '../hooks/useMediaQuery';
import { refreshScrollTriggers } from '../lib/scroll';
import DesignCard from './DesignCard';

const PAGE = 6;
const INITIAL = 12;
const ease = [0.16, 1, 0.3, 1];
const FILTERS = ['All', ...ROOMS];

export default function InspirationGallery({ filter, onFilterChange, onOpenDesign }) {
  const [visible, setVisible] = useState(INITIAL);
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isSm = useMediaQuery('(min-width: 640px)');
  const columnCount = isLg ? 3 : isSm ? 2 : 1;

  const filtered = useMemo(
    () => (filter === 'All' ? designs : designs.filter((d) => d.room === filter)),
    [filter]
  );
  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  // Reset paging when the filter changes.
  useEffect(() => setVisible(INITIAL), [filter]);

  // Content height changed: re-measure scroll animations further down the page.
  useEffect(() => {
    const t = setTimeout(refreshScrollTriggers, 450);
    return () => clearTimeout(t);
  }, [filter, visible, columnCount]);

  // Distribute left-to-right so newly loaded items append to the bottom of each column.
  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    shown.forEach((d, i) => cols[i % columnCount].push({ design: d, index: i }));
    return cols;
  }, [shown, columnCount]);

  return (
    <section id="inspiration" aria-labelledby="inspiration-title" className="section-y bg-white">
      <div className="container-site">
        <div className="grid gap-6 border-b border-charcoal/15 pb-10 md:grid-cols-12 md:items-end md:gap-10 lg:pb-14">
          <h2 id="inspiration-title" className="type-h2 max-w-[12ch] md:col-span-7">
            Inspiration Gallery
          </h2>
          <p className="max-w-[42ch] text-[15px] leading-[1.7] text-ink md:col-span-5 md:justify-self-end">
            A collection of interior concepts across rooms and styles. Save the designs you like to revisit them anytime
            in this browser.
          </p>
        </div>

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter by room"
          className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {FILTERS.map((f) => {
            const n = f === 'All' ? designs.length : designs.filter((d) => d.room === f).length;
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => onFilterChange(f)}
                aria-pressed={on}
                className={`relative shrink-0 border px-4 py-2.5 text-[14px] transition-colors duration-300 ${
                  on
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-charcoal/20 text-charcoal hover:border-charcoal'
                }`}
              >
                {f === 'All' ? 'All rooms' : f}
                <span className={`ml-2 text-[12px] ${on ? 'text-ivory/60' : 'text-stone-warm'}`}>{n}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${columnCount}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-12 flex gap-6 lg:gap-8"
          >
            {columns.map((col, c) => (
              <div key={c} className={`flex min-w-0 flex-1 flex-col gap-12 ${c === 1 ? 'lg:pt-16' : ''}`}>
                {col.map(({ design, index }) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.9, ease, delay: (index % columnCount) * 0.08 }}
                  >
                    <DesignCard design={design} onOpen={onOpenDesign} />
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load more */}
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          {remaining > 0 ? (
            <>
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE)}
                className="btn btn-outline"
              >
                Load more designs
              </button>
              <p className="type-meta">
                Showing {shown.length} of {filtered.length}
              </p>
            </>
          ) : (
            <p className="type-meta">
              {filter === 'All'
                ? `You have seen all ${filtered.length} designs.`
                : `You have seen all ${filtered.length} ${filter.toLowerCase()} designs.`}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
