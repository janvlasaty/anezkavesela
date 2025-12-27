import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface UseMarkdownContentResult {
  content: string;
  loading: boolean;
  error: string | null;
}

export function useMarkdownContent(filename: string): UseMarkdownContentResult {
  const { i18n } = useTranslation();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}content/${i18n.language}/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [filename, i18n.language]);

  return { content, loading, error };
}

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
        h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
        h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
        p: ({ children }) => <p className="md-p">{children}</p>,
        ul: ({ children }) => <ul className="md-ul">{children}</ul>,
        ol: ({ children }) => <ol className="md-ol">{children}</ol>,
        li: ({ children }) => <li className="md-li">{children}</li>,
        a: ({ href, children }) => (
          <a href={href} className="md-a" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="md-table-wrapper">
            <table className="md-table">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="md-th">{children}</th>,
        td: ({ children }) => <td className="md-td">{children}</td>,
        hr: () => <hr className="md-hr" />,
        strong: ({ children }) => <strong className="md-strong">{children}</strong>,
        blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
