import { useTranslation } from 'react-i18next';
import { couple, ganpati, logo_xl } from '../../util/images.util';

export const BioDataHeader = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white w-full shadow-2xl">
            {/* Header Section */}
            <div className="relative text-center flex justify-between items-center py-4  px-4 bio_header h-22
           sm:h-44 sm:px-2">

                {/* Left Logo */}
                <img className="w-[70px] md:w-[150px]" src={logo_xl} alt="Biodata Logo" />

                {/* Center Info */}
                <div className="flex flex-col leading-4  sm:leading-7 items-center justify-center text-center">
                    <h1 className=" md:text-3xl font-bold text-gray-900 tracking-wide">
                        {t('bioHeader.title', 'Bhoi Samaj Vivah Munch')}
                    </h1>
                    <p className="text-[10px] md:text-base text-white mt-1">
                        {t('bioHeader.tagline1', 'एक विश्वासार्ह व सुरक्षित विवाह जुळवणी मंच')}
                    </p>
                    <p className="text-[12px] text-white mt-1">
                        {t('bioHeader.tagline2', 'Empowering Bhoi Community for Meaningful Marriages')}
                    </p>
                    <p className="text-xs hidden sm:block text-gray-500 mt-1">
                        {t('bioHeader.tagline3')}
                    </p>
                    <p className="text-xs hidden sm:block text-gray-500 mt-1">
                        {t('bioHeader.tagline4')}
                    </p>
                </div>

                {/* Right Illustration */}
                <img className="w-[70px] md:w-[150px]" src={couple} alt="Couple Icon" />

                {/* Ganpati Bottom Center Icon */}
                <img
                    className="w-[40px] md:w-[60px] absolute bottom-[-25px] left-1/2 transform -translate-x-1/2"
                    src={ganpati}
                    alt="Ganpati Icon"
                />
            </div>
        </div>
    );
};
