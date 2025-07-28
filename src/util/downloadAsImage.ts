import html2canvas from 'html2canvas';

export const downloadAsImage = async ({
    setLoading,
    fileName,
    id
}: {
    setLoading: (value: boolean) => void;
    fileName: string;
    id: string;
}) => {
    const element = document.getElementById(id);

    if (!element) {
        console.error(`Element with ID "${id}" not found.`);
        return { success: false, fileName };
    }
    element.setAttribute('data-download', 'true');

    setLoading(true);

    try {
        const canvas = await html2canvas(element, {
            scale: 4,
            useCORS: true,
            backgroundColor: '#fff',
            windowWidth: 794
        });

        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = fileName;
        link.click();

        return { success: true, fileName };
    } catch (error) {
        console.error('Download failed:', error);
        return { success: false, fileName };
    } finally {
        setLoading(false);
        element.setAttribute('data-download', 'false');
    }
};
