
import { appConfig } from '../../config/appCinfig';
import Heading from '../../components/Headings/Heading';

export default function Category() {
    const { category } = appConfig;
    return (
        <>
            <Heading className="text-xl my-2 font-semibold" text="category" />
            <div className="w-full h-100 flex overflow-x-auto gap-4  no-scrollbar scroll-smooth">
                {category.map((item, index) => (
                    <div
                        key={index}
                        className="bg-secondary text-black min-w-40 h-20 rounded-2xl shadow-xl border-2 border-rose-100 flex justify-center items-center font-bold  text-xl px-3"
                    >
                        <span className="text-3xl mr-2">{item.icon}</span>
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
        </>

    )
}
