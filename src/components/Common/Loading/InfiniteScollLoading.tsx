import { loader } from "../../../util/images.util";


export default function InfiniteScollLoading({text}) {
    return (
        <div>
            <div className="flex flex-col justify-center items-center w-screen ">
                <img src={loader} alt="Loading..." className="w-16 h-16" />
                <p>{text}</p>
                {/* <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div> */}
            </div>
        </div>
    )
}


