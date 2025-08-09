import React from "react";
import { motion } from "framer-motion";
import { loader } from "../../util/images.util";

const Loading = ({ text = "Loading..." }) => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70 z-50">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-500"
            >
                <img src={loader} alt="Loading..." className="w-20 h-20" />
            </motion.div>

            <motion.p
                className="mt-4 text-gray-600 text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {text}
            </motion.p>
        </div>
    );
};

export { Loading };
