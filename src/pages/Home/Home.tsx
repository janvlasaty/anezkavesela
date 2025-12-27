import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.css';

// Background images for hero carousel
const backgroundImages = [
  `${import.meta.env.BASE_URL}images/hero-1.webp`,
  `${import.meta.env.BASE_URL}images/hero-2.webp`,
  `${import.meta.env.BASE_URL}images/hero-3.webp`,
  `${import.meta.env.BASE_URL}images/hero-4.webp`,
  `${import.meta.env.BASE_URL}images/hero-5.webp`,
];

export function Home() {
  const { t } = useTranslation();
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

  return (
    <div className="home">
      <div className="hero">
        {backgroundImages.map((img, index) => (
          <div
            key={img}
            className={`hero-bg ${index === currentImageIndex ? 'active' : ''} ${index === previousImageIndex ? 'previous' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero-overlay" />
        
        <div className="hero-content">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AV" className="hero-logo" />
          <h1 className="hero-title">Anežka Veselá</h1>
          <p className="hero-subtitle">{t('home.subtitle')}</p>
          <Link to="/about" className="hero-cta">
            {t('home.cta')}
          </Link>
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

        <div className="scroll-indicator">
          <div className="scroll-arrow" />
        </div>
      </div>
    </div>
  );
}
