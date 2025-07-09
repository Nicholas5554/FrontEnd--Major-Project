import { Button, Card } from "flowbite-react";
import { profile } from "../../Hooks/profile";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/userSlice";

const Profile = () => {
    const {
        user,
        navToChange
    } = profile();


    const [isCheckingAuth, setIsCheckingAuth] = useState(true);


    const { VITE_API_URL } = import.meta.env;
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    if (!token) {
        localStorage.setItem("token", "");
    }

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    axios.defaults.headers.common["x-auth-token"] = token;
                    const res = await axios.get(`${VITE_API_URL}/users/me`);
                    dispatch(userActions.login(res.data));
                } catch (error) {
                    localStorage.removeItem("token");
                }
            }
            setIsCheckingAuth(false);
        };

        fetchUser();
    }, []);

    if (isCheckingAuth) {
        return <div className="mt-10 text-xl text-white">Loading...</div>; // or a spinner
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-5 text-center dark:text-white">

            <h1 className="text-3xl font-bold text-teal-500">Profile Page</h1>
            <br />
            <div className="flex flex-wrap items-center justify-center w-full gap-4">
                <Card className="flex items-center justify-center w-auto">
                    <h1>Name : {user?.name.first} {user?.name.last}</h1>
                    <h2>Email : {user?.email}</h2>
                    <p>Status : {user?.isManager ? "Manager User" : "Personal User"}</p>
                </Card>

            </div>

            <Button onClick={navToChange} className="w-full mt-5">To Change Your Information</Button>
        </div>

    );
}

export default Profile;

