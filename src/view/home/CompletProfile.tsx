import { Link } from 'react-router-dom'
import { useLocalization } from '../../hooks';
import { RxCross2 } from 'react-icons/rx';
import { SiVerizon } from 'react-icons/si';
import { FaEdit } from 'react-icons/fa';
import { MdEditDocument, MdOutlineFileDownload } from 'react-icons/md';

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
                className="w-14 h-14 rounded-full object-fill aspect-square"
                src={avatar || 'https://via.placeholder.com/150'}
                alt="User avatar"
            />
         
            <div className="flex-1">
                <p className="text-center text-gray-700 text-sm md:text-base md:font-semibold mb-2">
                    {profleSMS[0]} <span className="italic text-primary">{profleSMS[1]}</span>.
                    {profleSMS[2]}
                </p>
                {complition < 80 ? <div className="w-full bg-gray-300 rounded-full h-3 md:5 overflow-hidden">
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
                </div>:
                 <div className="w-full flex justify-between gap-1   sticky bottom-0">
                                        <Link
                                        to={'/complet-profile'}
                                           
                                            type="button"
                            className="flex items-center justify-center text-sm gap-2 px-5 py-1 border-2 border-black text-black font-bold rounded-lg w-full"
                                        >
                            <MdEditDocument />
                                            Edit
                        </Link>
                
                        <Link
                            to={'/bio-download'}
                                            type="submit"
                                            className="flex items-center text-sm justify-center gap-2 px-5 py-1 bg_primary text-white font-bold rounded-lg w-full"
                                        >
                            <MdOutlineFileDownload size={20} />
                                            Download
                        </Link>
                                    </div>}
            </div>
        </Link>

    )
}
