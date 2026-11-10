import { ArrowUp, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { ROOMS } from '../data/designs';
import { scrollToSection } from '../lib/scroll';
import { NAV_LINKS } from './Navbar';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: Facebook },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: Linkedin },
  { label: 'YouTube', href: 'https://www.youtube.com/', Icon: Youtube },
];

export default function Footer({ onSelectRoom }) {
  const go = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer className="bg-charcoal pt-20 text-ivory lg:pt-28">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <a href="#home" onClick={(e) => go(e, '#home')} className="font-serif text-3xl tracking-[0.32em]">
              HOMORA
            </a>
            <p className="mt-6 max-w-[34ch] text-[15px] leading-[1.7] text-ivory/70">
              Imagine Your Space. Design Your Lifestyle. A curated home for interior inspiration, from a single
              reading corner to a whole house.
            </p>
            <ul className="mt-8 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`HOMORA on ${label} (opens in a new tab)`}
                    className="icon-btn border border-ivory/20 hover:border-ivory hover:bg-ivory hover:text-charcoal"
                  >
                    <Icon size={17} strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-[13px] text-ivory/50">Explore</h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={(e) => go(e, l.href)} className="link-line">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[13px] text-ivory/50">Design categories</h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                {ROOMS.map((room) => (
                  <li key={room}>
                    <a
                      href="#inspiration"
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectRoom(room);
                      }}
                      className="link-line"
                    >
                      {room === 'Exterior' ? 'Exteriors' : `${room}s`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[13px] text-ivory/50">Contact</h3>
              <address className="mt-5 space-y-3 text-[15px] not-italic text-ivory/85">
                <p>hello@homora.example</p>
                <p>+00 (0) 000 000 000</p>
                <p>
                  Studio address
                  <br />
                  City, Country
                </p>
              </address>
            </div>
          </nav>
        </div>

        <div aria-hidden="true" className="mt-20 overflow-hidden">
          <p className="select-none whitespace-nowrap text-center font-serif text-[clamp(3.5rem,16vw,15rem)] font-light leading-[0.85] tracking-[0.06em] text-ivory/[0.08]">
            HOMORA
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-ivory/15 py-8 text-[13px] text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HOMORA. All rights reserved. Photography via Unsplash.</p>
          <button
            type="button"
            onClick={() => scrollToSection('#home')}
            className="inline-flex items-center gap-2 self-start text-ivory/80 hover:text-ivory sm:self-auto"
          >
            Back to top <ArrowUp size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  );
}
