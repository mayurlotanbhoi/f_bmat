
import QRCode from 'react-qr-code'; // Or 'react-qr-code'
import { motion } from "framer-motion";

const PaymentQrCode = ({ profile }) => {
    const upiId = "mayur.bhoi1@ybl"; // <-- Replace
    const name = "mayur bho";       // <-- Replace
    const amount = "";              // Optional fixed amount
    const note = `Support Matrimony: Profile ${profile?.professionalDetails?.fullName}`;
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    const paymentApps = [
        {
            name: "UPI App",
            url: upiUrl,
            color: "bg-blue-600",
            hover: "hover:bg-blue-700",
        },
        {
            name: "Google Pay",
            url: `https://pay.google.com/gp/p/ui/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`,
            color: "bg-green-600",
            hover: "hover:bg-green-700",
        },
        {
            name: "PhonePe",
            url: `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`,
            color: "bg-purple-600",
            hover: "hover:bg-purple-700",
        },
        {
            name: "Paytm",
            url: `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`,
            color: "bg-indigo-600",
            hover: "hover:bg-indigo-700",
        },
    ];

    return (
        <motion.div
            className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Support Our Free Matrimony Service
            </h2>

            <div className="flex flex-col items-center gap-2">
                <QRCode value={upiUrl} size={160} />
                <p className="text-center text-gray-600 text-sm mt-2">
                    Scan this QR or click a button to pay via UPI<br />
                    <span className="font-mono text-xs text-gray-500">{upiId}</span>
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
                {paymentApps.map((app) => (
                    <a
                        key={app.name}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm px-4 py-2 rounded-xl text-white text-center font-medium transition ${app.color} ${app.hover}`}
                        aria-label={`Pay using ${app.name}`}
                    >
                        {app.name}
                    </a>
                ))}
            </div>

            <div className="mt-6 p-4 rounded-lg border border-green-300 bg-green-50 text-green-800">
                <div className="flex items-start gap-2">
                    <svg
                        className="w-5 h-5 mt-1 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM9.5 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 15H8a1 1 0 010-2h1v-3H8a1 1 0 010-2h2a1 1 0 011 1v4h1a1 1 0 010 2z" />
                    </svg>
                    <div>
                        <h3 className="font-semibold text-base">
                            This service is 100% free for all users.
                        </h3>
                        <p className="text-sm mt-1 leading-relaxed">
                            We do not charge for registration, search, or contact.
                            If you'd like to help with server & maintenance costs, feel free to contribute.
                            <br />
                            <strong>Even ₹30 (just 1 toffee/day!) helps us stay free for everyone.</strong>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PaymentQrCode;
