import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './Contact.css';

const socials = [
  { label: 'Instagram', handle: '@anesvesela', href: 'https://www.instagram.com/anesvesela/' },
  { label: 'Instagram PortDeBras', handle: '@_portdebras_prague', href: 'https://www.instagram.com/_portdebras_prague/' },
  { label: 'Facebook', handle: 'Anežka Veselá', href: 'https://www.facebook.com/anezka.vesela.77' },
];

const studios = [
  { name: 'Café Pilates', location: 'Praha Letňany', href: 'https://www.cafepilates.cz' },
  { name: 'Contemporary — prostor pro tanec', location: 'Praha 2', href: 'https://www.contemporary.cz' },
];

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const targets = containerRef.current?.querySelectorAll('.c-reveal');
    targets?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-revamp" ref={containerRef}>

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div
          className="contact-hero__bg"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/about-1.webp)` }}
        />
        <div className="contact-hero__overlay" />
        <img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt=""
          aria-hidden
          className="contact-hero__glyph"
        />
        <div className="contact-hero__inner">
          <span
            className="contact-hero__label c-reveal"
            style={{ '--delay': '0.05s' } as CSSProperties}
          >
            Praha · Česká republika
          </span>
          <h1
            className="contact-hero__name c-reveal"
            style={{ '--delay': '0.2s' } as CSSProperties}
          >
            Kontakt
          </h1>
        </div>
      </section>

      {/* ── Two columns ── */}
      <div className="contact-cols">

        {/* LEFT – dark */}
        <div className="c-col c-col--dark">

          <section className="c-section">
            <h2 className="c-heading c-reveal">
              Přímý kontakt
              <span className="c-heading__rule" />
            </h2>
            <div
              className="c-direct c-reveal"
              style={{ '--delay': '0.1s' } as CSSProperties}
            >
              <a href="tel:+420773945485">+420 773 945 485</a>
              <a href="mailto:anesvesela@icloud.com">anesvesela@icloud.com</a>
            </div>
          </section>

          <section className="c-section">
            <h2 className="c-heading c-reveal">
              Sociální sítě
              <span className="c-heading__rule" />
            </h2>
            <div className="c-social-list">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="c-social-item c-reveal"
                  style={{ '--delay': `${i * 0.1}s` } as CSSProperties}
                >
                  <span className="c-social-item__label">{s.label}</span>
                  <span className="c-social-item__handle">{s.handle}</span>
                </a>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT – light */}
        <div className="c-col c-col--light">

          <section className="c-section">
            <h2 className="c-heading c-heading--dark c-reveal">
              Místa výuky
              <span className="c-heading__rule c-heading__rule--dark" />
            </h2>
            <div className="c-studio-list">
              {studios.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="c-studio-item c-reveal"
                  style={{ '--delay': `${i * 0.12}s` } as CSSProperties}
                >
                  <strong>{s.name}</strong>
                  <span>{s.location}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="c-section">
            <h2 className="c-heading c-heading--dark c-reveal">
              Rezervace lekcí
              <span className="c-heading__rule c-heading__rule--dark" />
            </h2>
            <p
              className="c-booking-note c-reveal"
              style={{ '--delay': '0.1s' } as CSSProperties}
            >
              Pro rezervaci místa na lekci mě kontaktujte přes Instagram nebo Facebook.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
