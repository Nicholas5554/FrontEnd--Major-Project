import { Button, Card } from "flowbite-react";
import { profile } from "../../Hooks/profile";

const Profile = () => {
    const {
        user,
        navToChange
    } = profile();

    return (
        <div className="text-center dark:text-white w-[90vw] flex flex-col justify-center items-center gap-2">

            <h1 className="text-3xl font-bold text-teal-500">Profile Page</h1>
            <br />
            <div className="flex flex-wrap items-center justify-center gap-4 w-1/1">
                <Card className="flex items-center justify-center w-auto">
                    <h1>Name : {user?.name.first}</h1>
                    <h2>User Email : {user?.email}</h2>
                    <p>Status : {user?.isManager ? "Manager User" : "Personal User"}</p>
                </Card>

            </div>

            <Button onClick={navToChange} className="mt-5 w-58">To Change Your Information</Button>
        </div>

    );
}

export default Profile;

