// components/Modal.tsx
import React from 'react';
import { RxCross2 } from 'react-icons/rx';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseIcon?: boolean;
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-3xl',
};

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseIcon = true,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
            <div
                className={`bg-white w-full rounded-xl shadow-xl p-6 relative animate-fadeIn ${sizeClasses[size]}`}
            >
                {/* Close Button */}
                {showCloseIcon && (
                    <button
                        onClick={onClose}
                        className="absolute flex justify-center items-center rounded-xl top-3 right-3 bg-gray p-4 w-10 h-10 text-center text-gray-500 hover:text-red-500 text-2xl"
                    >
                        <span><RxCross2 /></span>
                    </button>
                )}

                {/* Modal Title */}
                {title && <h2 className="text-lg capitalize font-semibold mb-4">{title}</h2>}

                {/* Modal Content */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
