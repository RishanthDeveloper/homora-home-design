import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { allDesigns } from '../data/designs';
import { useFavorites } from '../hooks/useFavorites';
import useDialog from '../hooks/useDialog';
import useLockBodyScroll from '../hooks/useLockBodyScroll';
import SmartImage from './SmartImage';

const ease = [0.16, 1, 0.3, 1];

/** Slide-in drawer listing designs saved to localStorage. */
export default function SavedPanel({ open, onClose, onOpenDesign, onBrowse }) {
  const { ids, removeFavorite, clearFavorites } = useFavorites();
  const saved = ids.map((id) => allDesigns.find((d) => d.id === id)).filter(Boolean);
  const dialogRef = useDialog(open, onClose);
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="saved" className="fixed inset-0 z-[65]" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default bg-charcoal/50"
          />
          <motion.aside
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="saved-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-ivory"
          >
            <div className="flex items-center justify-between border-b border-charcoal/15 px-6 py-5">
              <h2 id="saved-title" className="font-serif text-[1.9rem] leading-none">
                Saved designs <span className="text-stone-warm">({saved.length})</span>
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="icon-btn -mr-2 hover:bg-charcoal hover:text-ivory"
                aria-label="Close saved designs"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {saved.length === 0 ? (
              <div className="flex flex-1 flex-col justify-center px-6">
                <p className="font-serif text-[2rem] leading-tight">Nothing saved yet.</p>
                <p className="type-lead mt-3 max-w-[34ch]">
                  Use the bookmark on any design to keep it here. Saved designs stay in this browser.
                </p>
                <button type="button" onClick={onBrowse} className="btn btn-dark mt-8 self-start">
                  Browse inspiration
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-charcoal/10 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {saved.map((d) => (
                      <motion.li
                        key={d.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-center gap-4 py-4"
                      >
                        <button
                          type="button"
                          onClick={() => onOpenDesign(d)}
                          className="group flex min-w-0 flex-1 items-center gap-4 text-left"
                        >
                          <div className="h-20 w-16 shrink-0 overflow-hidden bg-linen">
                            <div className="zoom-img h-full w-full">
                              <SmartImage photo={d.photo} alt="" sizes="64px" widths={[160, 240]} className="h-full w-full" />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-serif text-[1.35rem] leading-tight">{d.title}</p>
                            <p className="type-meta mt-1">
                              {d.style} {d.room.toLowerCase()}
                            </p>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFavorite(d.id)}
                          className="icon-btn shrink-0 text-stone-warm hover:text-charcoal"
                          aria-label={`Remove ${d.title} from saved`}
                        >
                          <X size={16} strokeWidth={1.5} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="flex items-center justify-between border-t border-charcoal/15 px-6 py-5">
                  <button type="button" onClick={clearFavorites} className="link-solid text-[14px]">
                    Remove all
                  </button>
                  <button type="button" onClick={onBrowse} className="btn btn-dark px-5 py-3">
                    Find more designs
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
