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
                    <img src={user?.image.url} alt={user?.image.alt} className="object-fill w-72 h-[200px]  m-auto" />
                    <h2>user id : {user?._id}</h2>
                    <h1>{user?.name.first}</h1>
                    <h3>{user?.address.country}</h3>
                    <p>{user?.isManager ? "Manager User" : "Personal User"}</p>
                    <p>{user?.phone}</p>
                </Card>

            </div>

            <Button onClick={navToChange} className="mt-5 w-58">To Change your information</Button>
        </div>

    );
}

export default Profile;

