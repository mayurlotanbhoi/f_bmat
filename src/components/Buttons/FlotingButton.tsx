
interface FloatingButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    text?: string;
}

export default function FloatingButton({ icon, onClick, text }: FloatingButtonProps) {
    return (
        <button
            className="fixed bottom-20 right-4 flex justify-center items-center text-sm font-semibold text-primary bg-white px-5 py-2 border border-pink-500 rounded-3xl gap-2 z-50 shadow-xl"
            onClick={onClick}
        >
            {icon}
            {text}
        </button>
    );
}
