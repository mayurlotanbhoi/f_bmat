import React from 'react';
import { Carousel as RawCarousel } from 'react-responsive-carousel';
const Carousel = RawCarousel as unknown as React.FC<any>;
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { banner } from '../../util/images.util';


const bannerImages = [
    banner,
    banner,
    banner,
];

export default function BannerCarouselWrapper() {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            swipeable={true}
        >
            {bannerImages.map((src, index) => (
                <div key={index}>
                    <img
                        src={src}
                        alt={`Banner ${index + 1}`}
                        className="h-[6.5rem] sm:h-[14rem] md:h-[17rem] w-full object-fill rounded-3xl"
                    />
                </div>
            ))}
        </Carousel>
    );
}
