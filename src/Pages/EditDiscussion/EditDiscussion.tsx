import { FloatingLabel, Button } from "flowbite-react";
import { editDiscussion } from "../../Hooks/editDiscussion";


const EditDiscussionDetails = () => {

    const { discussion, submitForm, errors, isValid, register, handleSubmit, } = editDiscussion();



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
                    <div className="flex flex-col">
                        <label className="dark:text-white" htmlFor="users">Users (Users id's)</label>
                        <textarea
                            id="users"
                            className="w-full p-2 text-sm border rounded dark:text-white dark:bg-gray-700"
                            rows={3}
                            {...register("users", {
                                setValueAs: (value) =>
                                    typeof value === "string" ? value.split(",").map((id) => id.trim()) : [],
                            })}
                        />

                        <span className="w-32 text-sm text-red-500">{errors.users?.message}</span>
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={!isValid} className="w-full dark:text-white">
                Save Changes
            </Button>

        </form>
    )
}

export default EditDiscussionDetails;