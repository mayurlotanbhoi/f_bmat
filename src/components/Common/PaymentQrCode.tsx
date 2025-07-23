import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';

const PaymentQrCode = ({ profile }) => {
    const upiId = 'mayur.bhoi1@ybl';
    const name = 'Mayur Bhoi';
    const amount = ''; // Optional: leave empty to allow user-defined amount
    const note = `Support Matrimony: Profile ${profile?.professionalDetails?.fullName || ''}`;
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    const paymentApps = [
        {
            name: 'Any UPI App',
            url: upiUrl,
            color: 'bg-gradient-to-r from-pink-500 to-yellow-500',
            hover: 'hover:opacity-90',
        },
    ];

    return (
        <motion.div
            className="max-w-md mx-auto p-6 rounded-3xl shadow-xl bg-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                ❤️ Help Keep Matrimony Free
            </h2>

            <p className="text-center text-gray-600 text-base mb-6">
                We proudly offer 100% free profiles for the first <span className="font-semibold text-green-700">1000 members</span>.
                No hidden charges – ever.
                <br />
                If our effort touches your heart, support us with any amount. Even ₹30 helps!
            </p>

            <div className="flex justify-center mb-4">
                <QRCode value={upiUrl} size={180} className="rounded-xl border p-1 bg-white shadow" />
            </div>

            <p className="text-center text-gray-500 text-sm mb-4">
                Scan above or tap below to open your UPI app
            </p>

            <div className="grid grid-cols-1 gap-3">
                {paymentApps.map((app) => (
                    <a
                        key={app.name}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-white font-semibold px-4 py-2 rounded-xl text-center transition-all duration-200 ${app.color} ${app.hover}`}
                    >
                        {`Pay using ${app.name}`}
                    </a>
                ))}
            </div>

            <div className="mt-6 p-4 rounded-xl border border-dashed border-green-400 bg-green-50 text-green-800">
                <div className="flex items-start gap-3">
                    <svg
                        className="w-6 h-6 shrink-0 mt-1 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM9.5 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 15H8a1 1 0 010-2h1v-3H8a1 1 0 010-2h2a1 1 0 011 1v4h1a1 1 0 010 2z" />
                    </svg>
                    <div>
                        <h4 className="text-base font-semibold">Why We Ask</h4>
                        <p className="text-sm mt-1 leading-relaxed">
                            We don’t charge for registration, browsing, or messaging. Your kind donation helps cover server, SMS, and support costs — to continue serving the community with love. 💚
                            <br />
                            <strong>Give only if you wish. There’s no obligation.</strong>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PaymentQrCode;
