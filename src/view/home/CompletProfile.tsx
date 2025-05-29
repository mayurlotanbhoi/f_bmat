import { Link } from 'react-router-dom'

export default function CompletProfile() {
    return (
        <Link to={'/complet-profile'} className="flex items-center gap-6 px-6 py-4 my-4 w-full  bg-[#FFF2E5] rounded-2xl shadow-md">
            <img
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover "
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                alt="User avatar"
            />
            <div className="flex-1">
                <p className="text-center text-gray-700 text-sm md:text-base md:font-semibold mb-2">
                    Oops! Your profile is <span className="italic text-orange-600">in progress</span>.
                    Complete it now to get more matches.
                </p>
                <div className="w-full bg-gray-300 rounded-full h-3 md:5 overflow-hidden">
                    <div
                        className=" bg-goldan h-full text-xs font-semibold  flex items-center justify-center transition-all duration-500 rounded-full"
                        style={{ width: '45%' }}
                        aria-valuenow={45}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        role="progressbar"
                    >
                        45%
                    </div>
                </div>
            </div>
        </Link>

    )
}
