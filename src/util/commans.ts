export const formatAmount = (amount: string | number | null | undefined, currencySymbol = '₹'): string => {
    if (amount === null || amount === undefined || amount === '') {
        return `${currencySymbol}0`;
    }

    // Convert to number
    const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]/g, '')) : amount;

    if (isNaN(num)) return `${currencySymbol}0`;

    // Format using Intl.NumberFormat for Indian system
    const formatted = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(num);

    return `${currencySymbol}${formatted}`;
};

type Address = {
    area?: string;
    city?: string;
    state?: string;
    country?: string;
    pinCode?: string;
};
export function formatAddress(address?: Address): string {
    if (!address || typeof address !== 'object') return 'पत्ता उपलब्ध नाही';

    const {
        area = '',
        city = '',
        state = '',
        country = '',
        pinCode = '',
    } = address;

    // Join all non-empty parts with comma
    const parts = [area, city, state, country, pinCode].filter(Boolean);

    return parts.length > 0 ? parts.join(', ') : 'पत्ता उपलब्ध नाही';
}
