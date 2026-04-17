import { useState, useEffect, useCallback, useRef } from 'react';
import type { CSSProperties } from 'react';
import './About.css';

const backgroundImages = [
  `${import.meta.env.BASE_URL}images/hero-1.webp`,
  `${import.meta.env.BASE_URL}images/hero-2.webp`,
  `${import.meta.env.BASE_URL}images/hero-3.webp`,
  `${import.meta.env.BASE_URL}images/hero-4.webp`,
  `${import.meta.env.BASE_URL}images/hero-5.webp`,
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState<number | null>(null);

  const nextImage = useCallback(() => {
    setPreviousImageIndex(currentImageIndex);
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
  }, [currentImageIndex]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  const handleIndicatorClick = (index: number) => {
    if (index !== currentImageIndex) {
      setPreviousImageIndex(currentImageIndex);
      setCurrentImageIndex(index);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = containerRef.current?.querySelectorAll('.reveal');
    targets?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const education = [
    { year: '2023/24', title: 'ESAD de Sevilla', sub: 'ERASMUS — Interpretación gestual, Španělsko' },
    { year: '2021–2024', title: 'JAMU Brno', sub: 'TAPDAV — Taneční pedagogika (BcA.)' },
    { year: '2019–2023', title: 'Taneční centrum Praha', sub: 'Tanec — kombinovaný studijní plán (DiS.)' },
  ];

  const danceCards = [
    {
      cat: 'Moderní tanec',
      items: ['Limón technika — Praha, Vídeň', 'Graham technika — Graham4Europe, Paříž', 'Horton technika — Bratislava'],
    },
    {
      cat: 'Současný tanec',
      items: ['ViViD Dance Company', 'Movement Factory Praha', 'ImPulsTanz Vídeň'],
    },
    {
      cat: 'Klasický tanec',
      items: ['Letní škola Hes Praha', 'N. divadlo — Márová, Štípa, Katsapov', 'Dance Perfect Praha'],
    },
    {
      cat: 'Flamenco',
      items: ['Praha — kurzy techniky', 'Sevilla — Estudio Alicia Marquéz', 'Sevilla — Estudio La Serena'],
    },
  ];

  const certGroups = [
    {
      title: 'PortDeBras™',
      items: ['Introduction', 'Basic', 'Band', 'Ball', 'Par Terre'].map((c) => `PortDeBras™ ${c}`),
    },
    {
      title: 'Pilates',
      items: ['Instruktor pilates (BP SPORT)', 'Forendors — My Pilates & Gábina Němečková'],
    },
    {
      title: 'Fitness',
      items: ['Základy Fitness (FISAF.cz)', 'Barre workshop — Ella Lambertová', '9 let závodní aerobic'],
    },
  ];

  return (
    <div className="about-revamp" ref={containerRef}>

      {/* ── Hero ── */}
      <section className="about-hero">
        {backgroundImages.map((img, index) => (
          <div
            key={img}
            className={`hero-bg ${index === currentImageIndex ? 'active' : ''} ${index === previousImageIndex ? 'previous' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero-overlay" />

        <img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt=""
          aria-hidden
          className="about-hero__glyph"
        />

        <div className="about-hero__inner">
          <span
            className="about-hero__label reveal"
            style={{ '--delay': '0.05s' } as CSSProperties}
          >
            Taneční pedagog · Fitness instruktorka · Praha
          </span>
          <h1
            className="about-hero__name reveal"
            style={{ '--delay': '0.2s' } as CSSProperties}
          >
            Anežka<br />Veselá
          </h1>
          <p
            className="about-hero__bio reveal"
            style={{ '--delay': '0.38s' } as CSSProperties}
          >
            Jako taneční pedagog pro děti i dospělé působím již 5. rokem. Vyučuji taneční průpravu,
            moderní taneční techniky (Limón, Graham), současný tanec, jazz, balet a flamenco fusion.
            V odvětví fitness se věnuji PortDeBras™, Pilates a Barre.
          </p>
          <div
            className="about-hero__badges reveal"
            style={{ '--delay': '0.52s' } as CSSProperties}
          >
            <span>BcA.</span>
            <span>DiS.</span>
            <span>5+ let praxe</span>
          </div>
        </div>

        <div className="hero-indicators">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="scroll-indicator">⌄</div>
      </section>

      {/* ── Two columns ── */}
      <div className="about-cols">

        {/* LEFT – black */}
        <div className="col col--dark">

          <section className="about-section">
            <h2 className="section-heading reveal">
              Vzdělání
              <span className="section-heading__rule" />
            </h2>
            <div className="timeline">
              {education.map((item, i) => (
                <div
                  key={i}
                  className="tl-item reveal"
                  style={{ '--delay': `${i * 0.15}s` } as CSSProperties}
                >
                  <span className="tl-item__year">{item.year}</span>
                  <span className="tl-item__dot" />
                  <div className="tl-item__body">
                    <strong>{item.title}</strong>
                    <span>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-heading reveal">
              Taneční vzdělání
              <span className="section-heading__rule" />
            </h2>
            <div className="dance-grid">
              {danceCards.map((card, i) => (
                <div
                  key={i}
                  className="dance-card reveal"
                  style={{ '--delay': `${i * 0.1}s` } as CSSProperties}
                >
                  <span className="dance-card__cat">{card.cat}</span>
                  <ul>
                    {card.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT – white */}
        <div className="col col--light">

          <section className="about-section">
            <h2 className="section-heading section-heading--dark reveal">
              Fitness &amp; Certifikace
              <span className="section-heading__rule section-heading__rule--dark" />
            </h2>
            {certGroups.map((group, i) => (
              <div
                key={i}
                className="cert-group reveal"
                style={{ '--delay': `${i * 0.12}s` } as CSSProperties}
              >
                <h3 className="cert-group__title">{group.title}</h3>
                <ul className="cert-list">
                  {group.items.map((item, j) => (
                    <li key={j} className="cert-item">
                      <span className="cert-item__pip" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="about-section">
            <h2 className="section-heading section-heading--dark reveal">
              Momentálně spolupracuji
              <span className="section-heading__rule section-heading__rule--dark" />
            </h2>
            <div className="studios">
              {['Capilates', 'Cafépilates', 'Euforie', 'Origami'].map((s, i) => (
                <div
                  key={i}
                  className="studio-tag reveal"
                  style={{ '--delay': `${i * 0.08}s` } as CSSProperties}
                >
                  {s}
                </div>
              ))}
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-heading section-heading--dark reveal">
              Kontakt
              <span className="section-heading__rule section-heading__rule--dark" />
            </h2>
            <div className="contact-links reveal">
              <a href="tel:+420773945485">+420 773 945 485</a>
              <a href="mailto:anesvesela@icloud.com">anesvesela@icloud.com</a>
              <a
                href="https://www.instagram.com/_bodymind_prague"
                target="_blank"
                rel="noopener noreferrer"
              >
                @_bodymind_prague
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
