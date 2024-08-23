import { useState } from 'react';
import styles from './AISummary.module.css';

interface AISummaryProps {
    blogContent: string;
}

const AISummary: React.FC<AISummaryProps> = ({ blogContent }) => {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSummarize = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                body: JSON.stringify({ content: blogContent, query: 'Please provide a concise summary of this blog post.' }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Failed to generate summary');
            }
            const data = await response.json();
            setSummary(data.answer);
        } catch (error) {
            setError('An error occurred while generating the summary. Please try again.');
            console.error('Error fetching summary:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className={styles.summaryContainer}>
            <button
                onClick={handleSummarize}
                disabled={isLoading}
                aria-busy={isLoading}
                className={styles.summarizeButton}
            >
                {isLoading ? 'Summarizing...' : 'Summarize with Claude AI'}
            </button>
            {error && <p className={styles.error} role="alert">{error}</p>}
            {summary && (
                <div className={styles.summaryChat} aria-live="polite">
                    <h3>Claude AI Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default AISummary;