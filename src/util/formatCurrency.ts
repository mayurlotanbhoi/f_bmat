type FormatCurrencyOptions = {
    currency?: string;       // e.g., 'INR', 'USD', 'EUR'
    locale?: string;         // e.g., 'en-IN', 'en-US', 'de-DE'
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
};

export const formatCurrency = (
    amount: number,
    options: FormatCurrencyOptions = {}
): string => {
    const {
        currency = 'INR',
        locale = 'en-IN',
        minimumFractionDigits = 0,
        maximumFractionDigits = 2,
    } = options;

    console.log("amount", amount)

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(amount);
};
