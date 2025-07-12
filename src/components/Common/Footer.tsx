
import { AiFillLike } from 'react-icons/ai';
import { FaHome, FaQrcode, FaUserCircle } from 'react-icons/fa';
import { IoMdHeartDislike } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation()?.pathname

    const links = [
        { key: 'home', label: 'Home', to: '/', icon: <FaHome size={30} /> },
        { key: 'matches', label: 'Matches', to: '/matches', icon: <IoMdHeartDislike size={30} /> },
        { key: 'likes', label: 'Likes', to: '/likes', icon: <AiFillLike size={30} /> },
        { key: 'profile', label: 'user', to: '/user', icon: <FaUserCircle size={30} /> }
    ];

    return (
        <footer className="w-full">
            {/* App Footer (Mobile) */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-inner flex justify-around items-center p-2 md:hidden z-50">
                {links.slice(0, 2).map((item) => (
                    <Link
                        key={item.key}
                        to={item.to}
                        className={`text-sm ${location === item.to ? 'text-primary' : 'text-gray-600'}   flex flex-col items-center`}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}

                {/* Center QR Button */}
                <Link
                    to="/scanner"
                    className={`absolute bg_primary -top-7 left-1/2 transform -translate-x-1/2  text-white p-3 rounded-full shadow-lg   `}
                >
                    {/* Use any QR icon or emoji */}
                    <FaQrcode size={30} />
                </Link>

                {links.slice(2).map((item) => (
                    <Link
                        key={item.key}
                        to={item.to}
                        className={`text-sm ${location === item.to ? 'text-primary' : 'text-gray-600'} flex flex-col items-center`}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>


            {/* Web Footer (Desktop) */}
            <div className="hidden md:flex justify-between items-center bg-gray-100 py-6 px-10 text-gray-600">
                <div className="font-semibold text-lg">© 2025 VaishyaParinay</div>
                <div className="flex gap-6 text-sm">
                    <Link to="/about" className="hover:text-black">About</Link>
                    <Link to="/terms" className="hover:text-black">Terms</Link>
                    <Link to="/privacy" className="hover:text-black">Privacy</Link>
                    <Link to="/contact" className="hover:text-black">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
