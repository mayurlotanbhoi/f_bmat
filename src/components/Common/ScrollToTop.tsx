// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to the top when pathname changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return null; // This component doesn't render anything
};

export default ScrollToTop;
