import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import type { DrawerProps } from "../../types/commonTypes";


const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    children,
    className,
    position = "right",
    widthClass = "w-80",
    heightClass = "h-80",
    showCloseBtn = true,
    padding = 'p-4'
}) => {
    const [show, setShow] = useState(isOpen);
    const [animateOut, setAnimateOut] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            setAnimateOut(false);
            document.body.style.overflow = "hidden";
        } else {
            setAnimateOut(true);
            document.body.style.overflow = "auto";
            setTimeout(() => setShow(false), 300); // duration of animation
        }
    }, [isOpen]);

    if (!show) return null;

    // Positions and animation classes
    const baseStyles = "fixed bg-white shadow-xl z-50 flex flex-col";
    let positionStyles = "";
    let animationClass = "";

    switch (position) {
        case "left":
            positionStyles = `top-0 left-0 h-full ${widthClass}`;
            animationClass = animateOut ? "animate-slide-out-left" : "animate-slide-in-left";
            break;
        case "right":
            positionStyles = `top-0 right-0 h-full ${widthClass}`;
            animationClass = animateOut ? "animate-slide-out-right" : "animate-slide-in-right";
            break;
        case "top":
            positionStyles = `top-0 left-0 w-full ${heightClass}`;
            animationClass = animateOut ? "animate-slide-out-top" : "animate-slide-in-top";
            break;
        case "bottom":
            positionStyles = `bottom-0 left-0 w-full ${heightClass}`;
            animationClass = animateOut ? "animate-slide-out-bottom" : "animate-slide-in-bottom";
            break;
    }

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0    bg-black/50 transition-opacity duration-300 ${animateOut ? "opacity-0" : "opacity-100"
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`${baseStyles} ${className}   ${positionStyles} ${animationClass}`}>
                {/* Close button */}
                {showCloseBtn && <div className="flex fixed right-0 z-50 bg-white justify-end p-4">
                    <button
                        onClick={onClose}
                        className="text-xl font-bold  "
                        aria-label="Close drawer"
                    >
                        <RxCross2 size={30} />
                    </button>
                </div>}

                {/* Content */}
                <div className={`flex-1 overflow-auto ${padding}`} >{children}</div>
            </div>
        </>,
        document.body
    );
};

export default Drawer;
