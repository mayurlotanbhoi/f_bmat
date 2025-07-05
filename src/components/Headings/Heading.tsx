


type HeadingProps = {
    text: string;
    className?: string;
};

export default function Heading({

    text,
    className,

}: HeadingProps) {
    // Default to h1-h6 or fallback to 'div' if invalid


    // Simple map for Tailwind text sizes to avoid dynamic class names


    return (
        <h6
            className={`capitalize w-100 text-gray-800 space-y-2 ${className}`}
        >
            {text}
        </h6>
    );
}
