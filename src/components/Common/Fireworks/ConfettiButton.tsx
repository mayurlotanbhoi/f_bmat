// src/components/magicui/confetti.tsx
"use client";

import confetti from "canvas-confetti";
import React from "react";

interface ConfettiButtonProps {
    children: React.ReactNode;
    className?: string;
}

const ConfettiButton: React.FC<ConfettiButtonProps> = ({ children, className }) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY } = e;

        const x = clientX / window.innerWidth;
        const y = clientY / window.innerHeight;

        confetti({
            origin: { x, y },
            particleCount: 80,
            spread: 80,
            startVelocity: 40,
            zIndex: 999,
        });
    };

    return (
        <div onClick={handleClick} className={`${className}`}>
            {children}
        </div>
    );
};

export default ConfettiButton;
