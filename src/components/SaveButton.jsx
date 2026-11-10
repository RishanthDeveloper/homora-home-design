import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

/** Toggles a design in the saved list (persisted in localStorage). */
export default function SaveButton({ design, variant = 'overlay', className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(design.id);

  if (variant === 'text') {
    return (
      <button
        type="button"
        onClick={() => toggleFavorite(design.id)}
        aria-pressed={saved}
        className={`btn ${saved ? 'btn-dark' : 'btn-outline'} ${className}`}
      >
        <Bookmark size={16} strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
        {saved ? 'Saved' : 'Save design'}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(design.id);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${design.title} from saved` : `Save ${design.title}`}
      className={`flex h-10 w-10 items-center justify-center transition-colors duration-300 ${
        saved ? 'bg-charcoal text-ivory' : 'bg-ivory/90 text-charcoal hover:bg-ivory'
      } ${className}`}
    >
      <Bookmark size={16} strokeWidth={1.6} fill={saved ? 'currentColor' : 'none'} />
    </motion.button>
  );
}
