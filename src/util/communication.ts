// utils/communication.ts

/**
 * Initiates a phone call to the given number.
 * @param phoneNumber - The recipient's phone number (with or without country code).
 */
export const makeCall = (phoneNumber: string) => {
    const sanitized = phoneNumber.replace(/\s+/g, '');
    window.location.href = `tel:${sanitized}`;
};

/**
 * Opens WhatsApp chat with a pre-filled message and optional biodata link.
 * @param options - Message options
 * @param options.phoneNumber - Recipient's phone number (in international format, without '+' or leading 0)
 * @param options.message - Text message to send
 * @param options.biodataUrl - Optional URL (e.g., biodata PDF or profile page)
 */
export const sendWhatsAppMessage = ({
    phoneNumber,
    message,
    biodataUrl,
}: {
    phoneNumber: string;
    message: string;
    biodataUrl?: string;
}) => {
    const baseUrl = 'https://wa.me/';
    const text = encodeURIComponent(
        biodataUrl ? `${message}\n\n🔗 Biodata:\n${biodataUrl}` : message
    );
    const sanitized = phoneNumber.replace(/\D+/g, ''); // remove non-digits
    window.open(`${baseUrl}${sanitized}?text=${text}`, '_blank');
};
