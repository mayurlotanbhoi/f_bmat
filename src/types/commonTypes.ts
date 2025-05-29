type DrawerPosition = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    position?: DrawerPosition;
    widthClass?: string; // For left/right drawers, e.g. "w-80"
    heightClass?: string; // For top/bottom drawers, e.g. "h-80"
    showCloseBtn?: boolean;
    padding?: string,
    className?: string,
}