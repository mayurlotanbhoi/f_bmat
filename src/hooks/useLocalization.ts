import { useTranslation } from 'react-i18next';


export function useLocalization<T = any>(key: string): T | string | null {
    const { t, ready, i18n } = useTranslation();

    if (!ready || !i18n.isInitialized) {
        return null;
    }

    // Try to get the object or value
    const result = t(key, { returnObjects: true });

    // If it's an object or array, return as generic type
    if (typeof result === 'object') {
        return result as T;
    }

    // If it's a simple string, return it directly
    return result as string;
}
