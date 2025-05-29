

export default function Banner() {
    const images = [
        "https://d2hy6ree306xec.cloudfront.net/Blog/Top10_matrimonial_sites_banner.webp",
        "https://d2hy6ree306xec.cloudfront.net/Blog/Top10_matrimonial_sites_banner.webp",
        "https://d2hy6ree306xec.cloudfront.net/Blog/Top10_matrimonial_sites_banner.webp",
    ];

    return (
        <>
            {images.map((img, idx) => (
                <div key={idx}>
                    <img className="h-[7rem] sm:h-[10rem] md:h-[18rem] w-full object-cover rounded-3xl" src={img} alt={`Slide ${idx + 1}`} />
                </div>
            ))}
        </>
    );
}
