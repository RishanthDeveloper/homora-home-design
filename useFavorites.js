import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'homora:saved-designs';
const FavoritesContext = createContext(null);

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(readStored);

  // Persist on change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* storage unavailable (private mode) — keep in memory */
    }
  }, [ids]);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) setIds(readStored());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isFavorite = useCallback((id) => ids.includes(id), [ids]);
  const toggleFavorite = useCallback(
    (id) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    []
  );
  const removeFavorite = useCallback((id) => setIds((prev) => prev.filter((x) => x !== id)), []);
  const clearFavorites = useCallback(() => setIds([]), []);

  const value = useMemo(
    () => ({ ids, count: ids.length, isFavorite, toggleFavorite, removeFavorite, clearFavorites }),
    [ids, isFavorite, toggleFavorite, removeFavorite, clearFavorites]
  );

  return createElement(FavoritesContext.Provider, { value }, children);
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside <FavoritesProvider>');
  return ctx;
}
