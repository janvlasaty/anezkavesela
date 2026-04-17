import { useState, useEffect, type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

const NAV_ITEMS = [
  { key: 'nav.home',     path: '/' },
  { key: 'nav.schedule', path: '/schedule' },
  { key: 'nav.contact',  path: '/contact' },
] as const;

export function Header() {
  const [isOpen, setIsOpen]       = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location                  = useLocation();
  const { t, i18n }               = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const openMenu = () => {
    setIsClosing(false);
    setIsOpen(true);
  };

  const closeMenu = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 450);
  };

  const handleTrigger = () => {
    if (!isOpen) openMenu();
    else closeMenu();
  };

  const toggleLanguage = () => {
    const next = i18n.language === 'cs' ? 'en' : 'cs';
    i18n.changeLanguage(next);
    localStorage.setItem('language', next);
  };

  /* Escape key closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, isClosing]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* ── Floating nav items – bottom-right, expand upward ── */}
      {isOpen && (
        <nav
          className={`floating-nav${isClosing ? ' is-closing' : ''}`}
          aria-label="Hlavní navigace"
        >
          <ul>
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.path}
                style={{
                  /* bottom items have shorter open-delay → appear first → grows upward */
                  '--open-delay':  `${(NAV_ITEMS.length - 1 - i) * 0.07}s`,
                  /* top items have shorter close-delay → disappear first → shrinks downward */
                  '--close-delay': `${i * 0.05}s`,
                } as CSSProperties}
              >
                <Link
                  to={item.path}
                  className={`fnav-link${isActive(item.path) ? ' is-active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="fnav-label">{t(item.key)}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* language toggle at the very bottom of the menu */}
          <div className="fnav-lang-row">
            <button className="fnav-lang" onClick={toggleLanguage}>
              {i18n.language === 'cs' ? 'EN' : 'CZ'}
            </button>
          </div>
        </nav>
      )}

      {/* ── Trigger button – bottom-right ── */}
      <button
        className={`menu-trigger${isOpen ? ' is-open' : ''}`}
        onClick={handleTrigger}
        aria-label={isOpen ? 'Zavřít menu' : 'Otevřít menu'}
        aria-expanded={isOpen}
      >
        <span className="menu-trigger__line" />
        <span className="menu-trigger__line" />
      </button>
    </>
  );
}
