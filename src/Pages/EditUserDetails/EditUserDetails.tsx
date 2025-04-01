import { FloatingLabel, Button } from "flowbite-react";
import { editUser } from "../../Hooks/editUser"


const EditUserDetails = () => {

    const {
        userInfo,
        navToProfile,
        patchUserStatus,
        deleteUser,
        submitForm,
        errors,
        isValid,
        register,
        handleSubmit
    } = editUser();

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1">

            <h1 className="text-2xl font-bold dark:text-white">Edit User Details</h1>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="First Name"
                        defaultValue={userInfo?.name.first || ""}
                        {...register("name.first")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.name?.first?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Middle Name"
                        defaultValue={userInfo?.name.middle || ""}
                        {...register("name.middle")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.name?.middle?.message}</span>
                </div>
            </div>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Last Name"
                        defaultValue={userInfo?.name.last || ""}
                        {...register("name.last")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.name?.last?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="phone"
                        variant="standard"
                        label="Phone"
                        defaultValue={userInfo?.phone || ""}
                        {...register("phone")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.phone?.message}</span>
                </div>
            </div>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image url"
                        defaultValue={userInfo?.image.url || ""}
                        {...register("image.url")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.image?.url?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image alt"
                        defaultValue={userInfo?.image.alt || ""}
                        {...register("image.alt")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.image?.alt?.message}</span>
                </div>
            </div>


            <div className="flex flex-row justify-around gap-11 w-80">

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="country"
                        defaultValue={userInfo?.address.country || ""}
                        {...register("address.country")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.address?.country?.message}</span>
                </div>
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="city"
                        defaultValue={userInfo?.address.city || ""}
                        {...register("address.city")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.address?.city?.message}</span>
                </div>


            </div>

            <div className="flex flex-row justify-around gap-11 w-80">

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="street"
                        defaultValue={userInfo?.address.street || ""}
                        {...register("address.street")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.address?.street?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="number"
                        variant="standard"
                        label="houseNumber"
                        defaultValue={userInfo?.address.houseNumber || ""}
                        {...register("address.houseNumber")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.address?.houseNumber?.message}</span>
                </div>

            </div>

            <button className="w-full h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToProfile}>
                Go Back
            </button>

            <Button type="submit" disabled={!isValid} className="w-full dark:text-white">
                Save Changes
            </Button>

            <Button type="button" className="w-full dark:text-white" onClick={patchUserStatus}>
                Change User Status?
            </Button>

            <button type="button" className="w-full h-10 text-sm text-white transition-colors bg-red-600 rounded-md hover:bg-red-800" onClick={deleteUser}>
                Delete my account?
            </button>
        </form>
    )
}

export default EditUserDetails;