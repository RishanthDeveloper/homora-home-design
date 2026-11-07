import SaveButton from './SaveButton';
import SmartImage from './SmartImage';

const RATIO = {
  portrait: 'aspect-[4/5]',
  tall: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
};

/** Image-led design card used by the style explorer and the gallery. */
export default function DesignCard({ design, onOpen, ratio, sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw' }) {
  const aspect = RATIO[ratio || design.ratio] || RATIO.portrait;
  return (
    <article className="group relative">
      <div className={`relative overflow-hidden bg-linen ${aspect}`}>
        <button
          type="button"
          onClick={() => onOpen(design)}
          className="absolute inset-0 block h-full w-full"
          aria-label={`View details for ${design.title}`}
        >
          <div className="zoom-img h-full w-full">
            <SmartImage photo={design.photo} alt={`${design.title}, ${design.style.toLowerCase()} ${design.room.toLowerCase()}`} sizes={sizes} className="h-full w-full" />
          </div>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between bg-charcoal/0 px-5 py-4 text-[13px] text-ivory opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:bg-charcoal/55 group-hover:opacity-100"
          >
            View details
          </span>
        </button>
        <SaveButton design={design} className="absolute right-3 top-3 z-10" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[1.45rem] leading-tight">{design.title}</h3>
        <p className="type-meta shrink-0">{design.area}</p>
      </div>
      <p className="type-meta mt-1">
        {design.style} {design.room.toLowerCase()}
      </p>
    </article>
  );
}
