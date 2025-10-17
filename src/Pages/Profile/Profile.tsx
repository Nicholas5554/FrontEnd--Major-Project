import { Button, Card } from "flowbite-react";
import { profile } from "../../Hooks/profile";

const Profile = () => {
    const {
        user,
        navToChange
    } = profile();

    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-5 text-center dark:text-white">

            <h1 className="text-3xl font-bold text-teal-500">Profile Page</h1>
            <br />
            <div className="flex flex-wrap items-center justify-center w-full gap-4">
                <Card className="flex items-center justify-center max-w-sm">
                    {user?.photoFile && <img src={user?.photoFile} alt="User Photo" />}
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

