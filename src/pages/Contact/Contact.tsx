import { useTranslation } from 'react-i18next';
import { useMarkdownContent, MarkdownRenderer } from '../../hooks/useMarkdownContent';
import './Contact.css';

export function Contact() {
  const { t } = useTranslation();
  const { content, loading, error } = useMarkdownContent('contact.md');

  if (loading) {
    return (
      <div className="contact page-loading">
        <div className="loader" />
        <p>{t('contact.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contact page-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="contact">
      <div className="contact-container">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
