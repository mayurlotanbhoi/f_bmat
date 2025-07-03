
import { appConfig } from '../../config/appCinfig';
import Heading from '../../components/Headings/Heading';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

export default function Category() {
    const { category } = appConfig;
    return (
        <>
            <Heading className="text-xl mt-2 font-semibold" text="category" />
            <div className="w-full overflow-x-auto no-scrollbar scroll-smooth pt-2 px-3">
                <div className="flex gap-4 min-w-max">
                    {category.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                            <Link to={`/profile/${item.key}`}>
                                <div
                                    className="w-40 h-24 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 shadow-md flex flex-col justify-center items-center px-3 text-white hover:scale-105 hover:shadow-xl transition-all duration-200"
                                    style={{
                                        backgroundImage: `linear-gradient(135deg, ${item.gradientFrom || '#ec4899'} 0%, ${item.gradientTo || '#f43f5e'
                                            } 100%)`,
                                        backgroundSize: 'cover',
                                        backgroundBlendMode: 'overlay',
                                    }}
                                >
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.text}
                                            className="w-10 h-10 mb-1 object-contain rounded-full border border-white shadow-sm"
                                        />
                                    )}
                                    <span className="text-sm text-primary
                                     font-semibold text-center">{item.text}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>

    )
}
