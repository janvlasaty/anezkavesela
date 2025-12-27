import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.css';

// Placeholder images - replace with actual dance photos
const backgroundImages = [
  'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1920&q=80',
  'https://images.unsplash.com/photo-1547153760-18fc86324498?w=1920&q=80',
  'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1920&q=80',
  'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1920&q=80',
];

export function Home() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="home">
      <div className="hero">
        {backgroundImages.map((img, index) => (
          <div
            key={img}
            className={`hero-bg ${index === currentImageIndex ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero-overlay" />
        
        <div className="hero-content">
          <h1 className="hero-title">{t('home.title')}</h1>
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
              onClick={() => setCurrentImageIndex(index)}
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
