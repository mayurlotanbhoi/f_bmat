import React from 'react';
import { Carousel as RawCarousel } from 'react-responsive-carousel';
const Carousel = RawCarousel as unknown as React.FC<any>;
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const bannerImages = [
    "https://d2hy6ree306xec.cloudfront.net/Blog/Top10_matrimonial_sites_banner.webp",
    "https://d2hy6ree306xec.cloudfront.net/Blog/Top10_matrimonial_sites_banner.webp",
    "https://d2hy6ree306xec.cloudfront.net/Blog/Top10_matrimonial_sites_banner.webp",
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
                        className="h-[6rem] sm:h-[14rem] md:h-[18rem] w-full object-cover rounded-3xl"
                    />
                </div>
            ))}
        </Carousel>
    );
}
