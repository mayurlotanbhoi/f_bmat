// import { useAuth } from "../../context/AuthContext";
import UserHeader from "./UserHeader";
import Tabs from "./Tabs";

export default function UserProfile() {
    // const { user, logout } = useAuth(); // Assumes user: { name, email, photo }

    // useEffect(() => {
    //     document.body.style.backgroundColor = "#FFFFFF";
    // }, []);

    return (
        <div className=" ">
            <UserHeader />

            <Tabs />


        </div>
    );
}
