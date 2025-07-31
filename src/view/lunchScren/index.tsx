import { motion } from 'framer-motion';
import {logo_xl} from "../../util/images.util" // Ensure logo is in `public` or use relative path

const LunchScreen = () => {
    return (
        <motion.div
      initial= {{ opacity: 0, scale: 0.9 }
}
animate = {{ opacity: 1, scale: 1 }}
exit = {{ opacity: 0 }}
transition = {{ duration: 0.8, ease: 'easeInOut' }}
className = "fixed inset-0 z-50 flex flex-col justify-center items-center bg_primary text-white"
    >
    <img
                src={logo_xl }
alt = "Bhoi Samaj Logo"
className = "w-32 md:w-32 h-auto mb-6 drop-shadow-lg"
    />
    <h1 className="text-2xl md:text-4xl font-bold tracking-wide text-center drop-shadow-sm" >
        Bhoi Samaj Vivah Munch
            </h1>
            < p className = "text-sm md:text-lg mt-2 text-center max-w-md font-medium" >
                एक विश्वासार्ह व सुरक्षित विवाह जुळवणी मंच < br />
                    Empowering Bhoi Community for Meaningful Marriages
                        </p>
                        </motion.div>
  );
};

export default LunchScreen;
