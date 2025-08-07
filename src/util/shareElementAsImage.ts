import html2canvas from 'html2canvas';

interface ShareOptions {
    filename?: string;
    promotionUrl?: string;
    shareTitle?: string;
    shareText?: string;
    fallbackText?: string;
    isWidemode?: boolean;
    additionalText?: string; // Extra promotional content
    includeHashtags?: boolean; // Add matrimony hashtags
    customHashtags?: string[]; // Custom hashtags array
    includeCallToAction?: boolean; // Add call-to-action text
    customCallToAction?: string; // Custom CTA message
    shortTextMode?: boolean; // Use shorter text for better compatibility
    onStart?: () => void;
    onComplete?: () => void;
}

export const shareElementAsImage = async (
    elementId: string,
    {
        filename = 'shared-image.png',
        promotionUrl = '',
        shareTitle = 'Shared Image',
        shareText = '',
        fallbackText = 'शेयरिंग समर्थित नहीं है। इमेज डाउनलोड की गई है।',
        isWidemode = true,
        additionalText = '',
        includeHashtags = false,
        customHashtags = [],
        includeCallToAction = false,
        customCallToAction = '',
        shortTextMode = false,
        onStart,
        onComplete,
    }: ShareOptions
) => {
    const element = document.getElementById(elementId);
    if (!element) return alert('❌ Element not found');

    try {
        onStart?.();

        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
            backgroundColor: '#fff',
            ...(isWidemode && { windowWidth: 794 }),
        });

        const dataUrl = canvas.toDataURL('image/png');
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], filename, { type: blob.type });

        // Build complete share text with all promotional content
        const textParts = [];

        if (shortTextMode) {
            // Shorter version for better WhatsApp compatibility
            if (shareText) textParts.push(shareText);
            if (promotionUrl) textParts.push(`🔗 ${promotionUrl}`);
        } else {
            // Full version
            if (shareText) textParts.push(shareText);
            if (additionalText) textParts.push(additionalText);
            if (includeCallToAction) {
                const defaultCTA = '💌 यदि आपको यह प्रोफाइल पसंद आई है तो कृपया संपर्क करें।';
                const ctaText = customCallToAction || defaultCTA;
                textParts.push(ctaText);
            }
            if (includeHashtags) {
                const defaultHashtags = ['#Matrimony', '#Biodata', '#Marriage', '#Shaadi', '#Profile'];
                const hashtagsToUse = customHashtags.length > 0 ? customHashtags : defaultHashtags;
                const hashtagString = hashtagsToUse.join(' ');
                textParts.push(hashtagString);
            }
            if (promotionUrl) textParts.push(`🔗 ${promotionUrl}`);
        }

        // Join all parts with appropriate separators
        const separator = shortTextMode ? '\n' : '\n\n';
        const fullShareText = textParts.filter(part => part.trim()).join(separator);

        if (navigator.canShare?.({ files: [file] })) {
            // Try sharing with both image and text first
            try {
                await navigator.share({
                    title: shareTitle,
                    text: fullShareText,
                    files: [file],
                });
            } catch (shareError) {
                console.log('Full share failed, trying image only:', shareError);
                // If full share fails, try image only and copy text to clipboard
                try {
                    await navigator.clipboard.writeText(fullShareText);
                    await navigator.share({
                        title: shareTitle,
                        files: [file],
                    });
                    alert('📋 Text copied to clipboard! Paste it after sharing the image.');
                } catch (fallbackError) {
                    console.error('Fallback share also failed:', fallbackError);
                    throw fallbackError;
                }
            }
        } else {
            // Fallback: download image and show text
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = filename;
            a.click();

            // Try to copy text to clipboard
            try {
                await navigator.clipboard.writeText(fullShareText);
                alert(`${fallbackText}\n\n📋 Text copied to clipboard!`);
            } catch (clipboardError) {
                alert(`${fallbackText}\n\n${fullShareText}`);
            }
        }
    } catch (err) {
        console.error('❌ Error sharing:', err);
        alert('⚠️ कुछ गड़बड़ हो गई। कृपया दोबारा प्रयास करें।');
    } finally {
        onComplete?.();
    }
};

// Enhanced usage example for matrimony:
/*
shareElementAsImage('biodata-card', {
    filename: 'card.png',
    shareTitle: `${profile?.personalDetails?.fullName}'s Matrimony Card`,
    shareText: `👤 ${profile?.personalDetails?.fullName}\n📍 ${profile?.contactDetails?.presentAddress?.city}`,

    // Additional promotional content
    additionalText: `🎓 ${profile?.educationDetails?.qualification}\n💼 ${profile?.professionalDetails?.occupation}`,

    // Call-to-action
    includeCallToAction: true,
    customCallToAction: '💌 Interested families please contact us for more details.',

    // Hashtags for better visibility
    includeHashtags: true,
    customHashtags: ['#Matrimony', '#Biodata', '#Marriage', '#Shaadi', `#${profile?.contactDetails?.presentAddress?.city}`],

    promotionUrl: biodataUrl,
    onComplete: () => {
        setShowShareModal(false);
        setShowPaymentQr(true);
    },
    isWidemode: true
});
*/

// Alternative: Simple enhanced version with just additional info
/*
shareElementAsImage('biodata-card', {
    filename: 'card.png',
    shareTitle: `${profile?.personalDetails?.fullName}'s Matrimony Card`,
    shareText: `👤 ${profile?.personalDetails?.fullName}\n📍 ${profile?.contactDetails?.presentAddress?.city}\n🎓 ${profile?.educationDetails?.qualification}\n💼 ${profile?.professionalDetails?.occupation}`,
    additionalText: '💌 Interested families are welcome to connect with us.',
    promotionUrl: biodataUrl,
    onComplete: () => { 
        setShowShareModal(false); 
        setShowPaymentQr(true);
    },
    isWidemode: true
});
*/