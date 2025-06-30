// components/StatusModal.tsx
import { motion, AnimatePresence } from "framer-motion";

const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

export const StatusModal = ({ type, message }: {
    type: 'loading' | 'success' | 'error';
    message: string;
}) => {
    return (
        <AnimatePresence>
            <motion.div
                key={type}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            >
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
                    <div className="text-xl font-semibold mb-2">
                        {type === 'loading' && '⏳'}
                        {type === 'success' && '✅'}
                        {type === 'error' && '❌'}
                    </div>
                    <p className="text-gray-800">{message}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
