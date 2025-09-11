import { useTranslation } from "react-i18next";

export const calculateAge = (dateOfBirth: any, t: (key: string) => string): string => {

    // Convert input to Date object
    if (dateOfBirth == null || dateOfBirth === 'N/A') return '';
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    // Validate input
    if (isNaN(birthDate.getTime())) {
        return "Invalid date";
    }
    if (birthDate > today) {
        return "Date is in the future";
    }

    // Extract UTC components to avoid timezone issues
    const birthYear = birthDate.getUTCFullYear();
    const birthMonth = birthDate.getUTCMonth();
    const birthDay = birthDate.getUTCDate();

    const currentYear = today.getUTCFullYear();
    const currentMonth = today.getUTCMonth();
    const currentDay = today.getUTCDate();

    // Calculate base difference
    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;

    // Adjust for birth day not yet reached
    if (currentDay < birthDay) {
        months--;

        // Handle month underflow
        if (months < 0) {
            years--;
            months += 12;
        }

        // Additional adjustment if subtracting month causes negative
        if (months < 0) {
            years--;
            months += 12;
        }
    }
    // Handle month underflow when day adjustment isn't needed
    else if (months < 0) {
        years--;
        months += 12;
    }

    // Format the output
    const yearText = years === 1 ? t('years') : t('years');
    const monthText = months === 1 ? t('months') : t('months');

    if (years > 0 && months > 0) {
        return `${years} ${yearText} ${months} ${monthText}`;
    } else if (years > 0) {
        return `${years} ${yearText}`;
    } else if (months > 0) {
        return `${months} ${monthText}`;
    } else {
        // Calculate weeks if less than a month
        const timeDiff = today.getTime() - birthDate.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);

        if (weeks > 0) {
            return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
        } else if (days > 0) {
            return `${days} ${days === 1 ? 'day' : 'days'}`;
        } else {
            return "Newborn";
        }
    }
}



type FormatDateOptions = {
    locale?: string;
    withTime?: boolean;
    onlyDate?: boolean;
    fullMonth?: boolean;
};

export const formatDate = (
    date: Date | string | number | null | undefined,
    options: FormatDateOptions = {}
): string => {
    const { t, ready, i18n } = useTranslation();
    const {
        locale = `${i18n.language}-IN`,
        withTime = false,
        onlyDate = false,
        fullMonth = true,
    } = options;

    console.log("date", date)

    if (!date) return 'Invalid Date';

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return 'Invalid Date';

    const dateFormat: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: fullMonth ? 'long' : 'short',
        year: 'numeric',
    };

    const timeFormat: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    const formatOptions: Intl.DateTimeFormatOptions = onlyDate
        ? dateFormat
        : withTime
            ? { ...dateFormat, ...timeFormat }
            : dateFormat;

    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
};

