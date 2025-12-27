import { useTranslation } from 'react-i18next';
import { useMarkdownContent, MarkdownRenderer } from '../../hooks/useMarkdownContent';
import './Schedule.css';

export function Schedule() {
  const { t } = useTranslation();
  const { content, loading, error } = useMarkdownContent('events.md');

  if (loading) {
    return (
      <div className="schedule page-loading">
        <div className="loader" />
        <p>{t('schedule.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schedule page-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="schedule">
      <div className="schedule-container">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
