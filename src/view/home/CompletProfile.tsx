import { Link } from 'react-router-dom'
import { useLocalization } from '../../hooks';

interface ProfileProps {
    profile: {
        complition: number;
        name: string;
        avatar: string;
    };
}

export default function CompletProfile({ profile }: ProfileProps) {
    const { complition, name, avatar } = profile;
    const profleSMS = useLocalization("completeProfileSMS")

    return (
        <Link to={'/complet-profile'} className="flex items-center gap-6 px-6 py-4 my-4 w-full  bg-[#FFF2E5] rounded-2xl shadow-md">
            <img
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover "
                src={avatar || 'https://via.placeholder.com/150'}
                alt="User avatar"
            />
            <div className="flex-1">
                <p className="text-center text-gray-700 text-sm md:text-base md:font-semibold mb-2">
                    {profleSMS[0]} <span className="italic text-primary">{profleSMS[1]}</span>.
                    {profleSMS[2]}
                </p>
                <div className="w-full bg-gray-300 rounded-full h-3 md:5 overflow-hidden">
                    <div
                        className=" bg_primary text-white h-full text-xs font-semibold  flex items-center justify-center transition-all duration-500 rounded-full"
                        style={{ width: `${complition}%` }}
                        aria-valuenow={complition}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        role="progressbar"
                    >
                        {complition}%
                    </div>
                </div>
            </div>
        </Link>

    )
}
