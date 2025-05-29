
import BackButtn from '../../Buttons/BackButtn';

interface DynamicHeaderProps {
    heading?: string
}

export default function DynamicHeader({ heading }: DynamicHeaderProps) {

    return (
        <header className="header bg_primary w-full shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto text-white px-4 sm:px-6 lg:px-8 flex items-center  h-16">

                {/* Logo / Title */}
                <div className="text-xl font-bold">
                    <BackButtn />
                </div>

                {/* Search Bar */}
                <div className="flex-1 mx-4 max-w-md capitalize">
                    <h1>{heading}</h1>
                </div>
            </div>
        </header>
    );
}
