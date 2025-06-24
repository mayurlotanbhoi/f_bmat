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
