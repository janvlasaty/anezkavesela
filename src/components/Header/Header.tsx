import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'cs' ? 'en' : 'cs';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AV" className="logo-img" />
        </Link>

        <nav className="nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            {t('nav.home')}
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            {t('nav.about')}
          </Link>
          <Link to="/schedule" className={`nav-link ${isActive('/schedule') ? 'active' : ''}`}>
            {t('nav.schedule')}
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            {t('nav.contact')}
          </Link>
        </nav>

        <button onClick={toggleLanguage} className="lang-toggle">
          {i18n.language === 'cs' ? 'EN' : 'CZ'}
        </button>
      </div>
    </header>
  );
}
