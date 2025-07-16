import { FloatingLabel, Button } from "flowbite-react";
import { editUser } from "../../Hooks/editUser"


const EditUserDetails = () => {

    const {
        userInfo,
        navToProfile,
        deleteUser,
        submitForm,
        errors,
        isValid,
        register,
        handleSubmit
    } = editUser();

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-72">

            <h1 className="text-2xl font-bold dark:text-white">Edit User Details</h1>

            <div className="flex flex-col w-full">
                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="First Name"
                    defaultValue={userInfo?.name.first || ""}
                    {...register("name.first")}
                />
                <span className="w-32 text-sm text-red-500">{errors.name?.first?.message}</span>
            </div>

            <div className="flex flex-col w-full">
                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="Last Name"
                    defaultValue={userInfo?.name.last || ""}
                    {...register("name.last")}
                />
                <span className="w-32 text-sm text-red-500">{errors.name?.last?.message}</span>
            </div>

            <div className="flex flex-col w-full">
                <FloatingLabel className="dark:text-white"
                    type="email"
                    variant="standard"
                    label="Email"
                    defaultValue={userInfo?.email || ""}
                    {...register("email")}
                />
                <span className="w-32 text-sm text-red-500">{errors.email?.message}</span>
            </div>

            <button className="w-full h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToProfile}>
                Go Back
            </button>

            <Button type="submit" disabled={!isValid} className="w-full dark:text-white">
                Save Changes
            </Button>

            <button type="button" className="w-full h-10 text-sm text-white transition-colors bg-red-600 rounded-md hover:bg-red-800" onClick={deleteUser}>
                Delete my account?
            </button>
        </form>
    )
}

export default EditUserDetails;