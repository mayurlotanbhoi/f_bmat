// src/components/ChunkError.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChunkError() {
    const navigate = useNavigate();

    // Auto-retry once after 5 seconds
    useEffect(() => {
        const retryTimer = setTimeout(() => {
            window.location.reload();
        }, 5000);

        return () => clearTimeout(retryTimer);
    }, []);

    return (
        <div className="chunk-error">
            <h1>⚠️ Application Update Required</h1>
            <p>
                We've detected a newer version of the application. Please check your internet connection
                and try reloading the page.
            </p>

            <div className="actions">
                <button onClick={() => window.location.reload()} className="retry-button">
                    Reload Now
                </button>
                <button onClick={() => navigate(-1)} className="back-button">
                    Go Back
                </button>
            </div>

            <p className="support-text">
                If the problem persists, contact support at
                <a href="mailto:support@example.com">support@example.com</a>
            </p>
        </div>
    );
}