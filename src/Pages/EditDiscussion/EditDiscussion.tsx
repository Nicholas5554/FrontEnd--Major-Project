import { FloatingLabel, Button } from "flowbite-react";
import { editDiscussion } from "../../Hooks/editDiscussion";


const EditDiscussionDetails = () => {

    const {
        discussion,
        submitForm,
        errors,
        isValid,
        register,
        handleSubmit
    } = editDiscussion();

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1">

            <h1 className="text-2xl font-bold dark:text-white">Edit Discussion Details</h1>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Title"
                        defaultValue={discussion?.title || ""}
                        {...register("title")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.title?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Content"
                        defaultValue={discussion?.content || ""}
                        {...register("content")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.content?.message}</span>
                </div>
            </div>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Description"
                        defaultValue={discussion?.description || ""}
                        {...register("description")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.description?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Users"
                        defaultValue={Array.isArray(discussion?.users) ? discussion.users.map(user => user.userId).join(", ") : discussion?.users || ""}
                        {...register("users")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.users?.message}</span>
                </div>
            </div>

            {/* <button className="w-full h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToProfile}>
                Go Back
            </button> */}

            <Button type="submit" disabled={!isValid} className="w-full dark:text-white">
                Save Changes
            </Button>

        </form>
    )
}

export default EditDiscussionDetails;