import html2canvas from 'html2canvas';

interface ShareOptions {
    filename?: string;
    promotionUrl?: string;
    shareTitle?: string;
    shareText?: string;
    fallbackText?: string;
    isWidemode?: boolean;
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

        const shareFullText = `${shareText}\n\n🔗 ${promotionUrl}`;

        if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({
                title: shareTitle,
                text: shareFullText,
                files: [file],
            });
        } else {
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = filename;
            a.click();

            alert(`${fallbackText}\n\n🔗 ${promotionUrl}`);
        }
    } catch (err) {
        console.error('❌ Error sharing:', err);
        alert('⚠️ कुछ गड़बड़ हो गई। कृपया दोबारा प्रयास करें।');
    } finally {
        onComplete?.();
    }
};
