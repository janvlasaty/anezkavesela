import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import './Schedule.css';

const classes = [
  {
    num: '01',
    name: 'PortDeBras™',
    tag: 'Fitness · Pohybová metoda',
    desc: 'Unikátní cvičební systém kombinující prvky klasického tance, pilates a jógy. Cvičení v dechu, elegantní pohyb a vědomá práce s tělem jsou základem každé lekce. Certifikovaná lektorka.',
    variant: 'light' as const,
    sessions: [
      { day: 'Úterý',   time: '09:15 – 10:15', studio: 'Café Pilates',                   location: 'Praha Letňany', url: 'https://www.cafepilates.cz' },
      { day: 'Čtvrtek', time: '11:30 – 12:30', studio: 'Contemporary – prostor pro tanec', location: 'Praha 2',      url: 'https://www.contemporary.cz' },
      { day: 'Neděle',  time: '17:00 – 18:00', studio: 'Café Pilates',                   location: 'Praha Letňany', url: 'https://www.cafepilates.cz' },
    ],
    studios: [] as string[],
  },
  {
    num: '02',
    name: 'Pilates',
    tag: 'Fitness · Core & Rovnováha',
    desc: 'Lekce Pilates zaměřené na zpevnění středu těla, zlepšení držení a vědomou práci se svaly. Vhodné pro všechny úrovně — od naprostých začátečníků po pokročilé.',
    variant: 'dark' as const,
    sessions: [],
    studios: ['Capilates', 'Cafépilates', 'Euforie'],
  },
  {
    num: '03',
    name: 'Barre',
    tag: 'Fitness · Taneční fitness',
    desc: 'Inspirováno baletní průpravou — Barre spojuje prvky baletu, pilates a silového cvičení u tyče. Tvaruje, zpevňuje a rozvíjí koordinaci i rovnováhu.',
    variant: 'light' as const,
    sessions: [],
    studios: ['Origami'],
  },
];

export function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    containerRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lekce" ref={containerRef}>

      {/* ── Hero ── */}
      <section className="lekce-hero">
        <span className="lekce-hero__bg" aria-hidden>LEKCE</span>
        <img src={`${import.meta.env.BASE_URL}logo.svg`} className="lekce-hero__glyph" alt="" aria-hidden />
        <div className="lekce-hero__inner">
          <span className="lekce-hero__label reveal" style={{ '--delay': '0.05s' } as CSSProperties}>
            Praha · Pravidelné lekce & workshopy
          </span>
          <h1 className="lekce-hero__title reveal" style={{ '--delay': '0.18s' } as CSSProperties}>
            Lekce
          </h1>
          <p className="lekce-hero__desc reveal" style={{ '--delay': '0.32s' } as CSSProperties}>
            Vedu pravidelné lekce a workshopy pro všechny věkové kategorie a úrovně.<br />
            Každá lekce je přizpůsobena skupině.
          </p>
        </div>
      </section>

      {/* ── Class cards ── */}
      <div className="lekce-list">
        {classes.map((cls, i) => (
          <article
            key={cls.num}
            className={`lekce-card lekce-card--${cls.variant} reveal`}
            style={{ '--delay': `${i * 0.08}s` } as CSSProperties}
          >
            {/* Card head: name + description */}
            <div className="lekce-card__head">
              <div className="lekce-card__meta">
                <span className="lekce-card__tag">{cls.tag}</span>
                <span className="lekce-card__num" aria-hidden>{cls.num}</span>
              </div>
              <h2 className="lekce-card__name">{cls.name}</h2>
              <p className="lekce-card__desc">{cls.desc}</p>
            </div>

            {/* Divider */}
            <div className="lekce-card__divider" />

            {/* Card body: schedule */}
            <div className="lekce-card__body">
              {cls.sessions.length > 0 ? (
                <>
                  <span className="lekce-card__section-label">Kdy &amp; Kde</span>
                  <div className="sessions">
                    {cls.sessions.map((s, j) => (
                      <a
                        key={j}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="session-row reveal"
                        style={{ '--delay': `${j * 0.1}s` } as CSSProperties}
                      >
                        <span className="session-row__day">{s.day}</span>
                        <span className="session-row__time">{s.time}</span>
                        <span className="session-row__studio">{s.studio}</span>
                        <span className="session-row__location">{s.location}</span>
                        <span className="session-row__arrow">↗</span>
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {cls.studios.length > 0 && (
                    <>
                      <span className="lekce-card__section-label">Studia</span>
                      <div className="lekce-studios">
                        {cls.studios.map((s) => (
                          <span key={s} className="lekce-studio-chip">{s}</span>
                        ))}
                      </div>
                    </>
                  )}
                  <p className="lekce-card__note">
                    Pro aktuální termíny mě kontaktujte →
                  </p>
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <section className="lekce-cta-section">
        <p className="lekce-cta-text reveal" style={{ '--delay': '0.1s' } as CSSProperties}>
          Zajímá vás lekce nebo workshop?
        </p>
        <Link
          to="/contact"
          className="lekce-cta-btn reveal"
          style={{ '--delay': '0.25s' } as CSSProperties}
        >
          Napsat zprávu
        </Link>
      </section>

    </div>
  );
}
