import { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import RoomCategories from '../components/RoomCategories';
import FeaturedShowcase from '../components/FeaturedShowcase';
import StyleExplorer from '../components/StyleExplorer';
import InspirationGallery from '../components/InspirationGallery';
import DesignProcess from '../components/DesignProcess';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SearchOverlay from '../components/SearchOverlay';
import DesignModal from '../components/DesignModal';
import SavedPanel from '../components/SavedPanel';
import { scrollToSection } from '../lib/scroll';

export default function Home() {
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [activeDesign, setActiveDesign] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);

  const openDesign = useCallback((design) => setActiveDesign(design), []);
  const closeDesign = useCallback(() => setActiveDesign(null), []);

  /** Jump to the gallery with a room filter applied. */
  const exploreRoom = useCallback((room) => {
    setGalleryFilter(room);
    scrollToSection('#inspiration');
  }, []);

  // Keyboard shortcut: Ctrl/Cmd + K or "/" opens search.
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(e.target.tagName);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a
        href="#explore"
        className="fixed left-4 top-4 z-[80] -translate-y-24 bg-charcoal px-4 py-3 text-sm text-ivory focus:translate-y-0"
      >
        Skip to content
      </a>

      <Navbar onOpenSearch={() => setSearchOpen(true)} onOpenSaved={() => setSavedOpen(true)} />

      <main>
        <HeroSlider />
        <RoomCategories onExploreRoom={exploreRoom} />
        <FeaturedShowcase onOpenDesign={openDesign} />
        <StyleExplorer onOpenDesign={openDesign} />
        <InspirationGallery filter={galleryFilter} onFilterChange={setGalleryFilter} onOpenDesign={openDesign} />
        <DesignProcess />
        <Testimonials />
        <CallToAction />
        <Contact />
      </main>

      <Footer onSelectRoom={exploreRoom} />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onOpenDesign={openDesign} />
      <SavedPanel
        open={savedOpen}
        onClose={() => setSavedOpen(false)}
        onOpenDesign={(d) => {
          setSavedOpen(false);
          setTimeout(() => openDesign(d), 200);
        }}
        onBrowse={() => {
          setSavedOpen(false);
          setTimeout(() => scrollToSection('#inspiration'), 250);
        }}
      />
      <DesignModal design={activeDesign} onClose={closeDesign} onSelect={openDesign} />
    </>
  );
}
