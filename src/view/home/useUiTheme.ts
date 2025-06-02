import { useEffect } from 'react';
import { appConfig } from '../../config/appCinfig';

const useUiTheme = () => {
    useEffect(() => {
        const { app } = appConfig;
        const root = document.documentElement;

        // ✅ Set CSS variables
        root.style.setProperty('--primary_color', app.theme.primaryColor);
        root.style.setProperty('--font-family', app.theme.font);

        // ✅ Dynamically update meta tags
        const setMeta = (name: string, content: string) => {
            let meta = document.querySelector(`meta[name="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('name', name);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        setMeta('theme-color', app.theme.primaryColor);
        setMeta('msapplication-TileColor', app.theme.primaryColor);
        setMeta('apple-mobile-web-app-status-bar-style', 'black-translucent');
        setMeta('apple-mobile-web-app-capable', 'yes');
    }, []);
};

export default useUiTheme;
