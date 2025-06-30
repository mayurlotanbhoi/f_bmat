import { useState } from "react";
import { createPortal } from "react-dom";
import { StatusModal } from "./StatusModal";

export function useStatusModal() {
    const [modal, setModal] = useState<null | {
        type: 'loading' | 'success' | 'error';
        message: string;
    }>(null);

    const show = (type: 'loading' | 'success' | 'error', message: string) => {
        setModal({ type, message });
    };

    const hide = () => setModal(null);

    const Modal = modal
        ? () => createPortal(<StatusModal {...modal} />, document.body)
        : () => null;

    return { show, hide, Modal };
}
