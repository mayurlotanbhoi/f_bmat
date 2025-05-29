
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';

interface BackButtnProps {
    onClick?: () => void
}

export default function BackButtn({ onClick }: BackButtnProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(-1); // Go back one step
        }
    };
    return (
        <IoArrowBack onClick={handleClick} className="text-3xl cursor-pointer" />
    )
}
