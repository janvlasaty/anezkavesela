import { useTranslation } from 'react-i18next';
import { useMarkdownContent, MarkdownRenderer } from '../../hooks/useMarkdownContent';
import './About.css';

export function About() {
  const { t } = useTranslation();
  const { content, loading, error } = useMarkdownContent('about.md');

  if (loading) {
    return (
      <div className="about page-loading">
        <div className="loader" />
        <p>{t('about.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="about page-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="about">
      <div className="about-container">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
