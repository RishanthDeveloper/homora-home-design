import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { designs } from '../data/designs';
import useDialog from '../hooks/useDialog';
import useLockBodyScroll from '../hooks/useLockBodyScroll';
import SaveButton from './SaveButton';
import SmartImage from './SmartImage';

const ease = [0.16, 1, 0.3, 1];

export default function DesignModal({ design, onClose, onSelect }) {
  const open = Boolean(design);
  const dialogRef = useDialog(open, onClose);
  useLockBodyScroll(open);

  const similar = design
    ? designs.filter((d) => d.id !== design.id && (d.style === design.style || d.room === design.room)).slice(0, 3)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="design-modal"
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-charcoal/70 backdrop-blur-[2px]"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="design-modal-title"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="relative grid max-h-[92svh] w-full max-w-[1180px] overflow-y-auto bg-ivory lg:max-h-[88vh] lg:grid-cols-[1.25fr_1fr] lg:overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-[42svh] min-h-[260px] bg-linen sm:h-[50vh] lg:h-auto lg:min-h-[560px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                  className="absolute inset-0"
                >
                  <SmartImage
                    photo={design.photo}
                    alt={`${design.title}, ${design.style.toLowerCase()} ${design.room.toLowerCase()}`}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="h-full w-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Details */}
            <div className="flex flex-col p-6 sm:p-10 lg:overflow-y-auto">
              <div className="flex items-start justify-between gap-6">
                <p className="type-meta pt-2">
                  {design.style} {design.room.toLowerCase()}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="icon-btn -mr-2 -mt-1 shrink-0 hover:bg-charcoal hover:text-ivory"
                  aria-label="Close design details"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <h2 id="design-modal-title" className="type-display mt-2 text-[clamp(2.4rem,4vw,3.75rem)]">
                {design.title}
              </h2>
              <p className="type-lead mt-5">{design.description}</p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-charcoal/15 pt-6 text-[14px]">
                <div>
                  <dt className="type-meta">Room</dt>
                  <dd className="mt-1">{design.room}</dd>
                </div>
                <div>
                  <dt className="type-meta">Style</dt>
                  <dd className="mt-1">{design.style}</dd>
                </div>
                <div>
                  <dt className="type-meta">Area</dt>
                  <dd className="mt-1">{design.area}</dd>
                </div>
                <div>
                  <dt className="type-meta">Concept by</dt>
                  <dd className="mt-1">{design.studio}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="type-meta">Materials</dt>
                  <dd className="mt-1">{design.materials.join(', ')}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="type-meta">Palette</dt>
                  <dd className="mt-3 flex flex-wrap gap-5">
                    {design.palette.map((c) => (
                      <span key={c.hex} className="flex items-center gap-2">
                        <span className="h-7 w-7 border border-charcoal/10" style={{ backgroundColor: c.hex }} />
                        <span>
                          {c.name}
                          <span className="ml-1.5 text-stone-warm">{c.hex}</span>
                        </span>
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <SaveButton design={design} variant="text" />
                <button type="button" onClick={onClose} className="btn btn-outline">
                  Keep browsing
                </button>
              </div>

              {similar.length > 0 && (
                <div className="mt-10 border-t border-charcoal/15 pt-6">
                  <p className="type-meta">You may also like</p>
                  <ul className="mt-4 grid grid-cols-3 gap-3">
                    {similar.map((d) => (
                      <li key={d.id}>
                        <button
                          type="button"
                          onClick={() => onSelect(d)}
                          className="group block w-full text-left"
                          aria-label={`View ${d.title}`}
                        >
                          <div className="aspect-[4/5] overflow-hidden bg-linen">
                            <div className="zoom-img h-full w-full">
                              <SmartImage photo={d.photo} alt="" sizes="160px" widths={[320, 480]} className="h-full w-full" />
                            </div>
                          </div>
                          <p className="mt-2 text-[13px] leading-snug">{d.title}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="type-meta mt-10 text-[12px]">
                Sample design for inspiration. Studio names are fictional; photography via Unsplash.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
