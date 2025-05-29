

import confetti from "canvas-confetti";



export default function ConfettiFireworks() {

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };



    const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;


    const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 500 * (timeLeft / duration);
        confetti({
            ...defaults,
            particleCount,
            // shapes: ["star"],
            // colors: ["#DB2777", "#DB2777", "#DB2777", "#DB2777", "#DB2777"],
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
            ...defaults,
            particleCount,
            // shapes: ["star"],
            // colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
    }, 250);
};



