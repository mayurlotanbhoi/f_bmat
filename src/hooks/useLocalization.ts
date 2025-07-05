import { useTranslation } from 'react-i18next';

export function useLocalization<T = any>(key: string): T | null {
    const { t, ready, i18n } = useTranslation();
    console.log("Current language:", i18n.language);

    if (!ready || !i18n.isInitialized) {
        return null;
    }

    const result = t(key, { returnObjects: true }) as T;
    return result;
}