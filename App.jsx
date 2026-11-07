import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { FavoritesProvider } from './hooks/useFavorites';
import { ScrollTrigger } from './lib/gsap';
import Home from './pages/Home.jsx';

export default function App() {
  // Web fonts and images change layout heights; re-measure scroll triggers once they settle.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    // reducedMotion="user" makes every Framer Motion animation honour prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <FavoritesProvider>
        <Home />
      </FavoritesProvider>
    </MotionConfig>
  );
}
