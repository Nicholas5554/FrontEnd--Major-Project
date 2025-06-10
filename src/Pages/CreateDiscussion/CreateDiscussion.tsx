import { FloatingLabel, Button } from "flowbite-react";
import { createDiscussion } from "../../Hooks/createDiscussion";


const CreateDiscussion = () => {

    const {
        onSubmit,
        errors,
        isValid,
        register,
        handleSubmit,
        navToMyDiscussions
    } = createDiscussion();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1">

            <h1 className="text-2xl font-bold dark:text-white">Edit Discussion Details</h1>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Title"
                        {...register("title")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.title?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Content"
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
                        {...register("description")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.description?.message}</span>
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label className="dark:text-white" htmlFor="users">Users (User Id's)</label>
                        <textarea
                            id="users"
                            className="w-full p-2 text-sm border rounded dark:text-white dark:bg-gray-700"
                            rows={1}
                            {...register("users", {
                                setValueAs: (value) =>
                                    typeof value === "string" ? value.split(",").map((id) => id.trim()) : [],
                            })}
                        />
                        <span className="w-32 text-sm text-red-500">{errors.users?.message}</span>
                    </div>
                </div>
            </div>

            <button className="w-full h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToMyDiscussions}>Go Back</button>

            <Button type="submit" disabled={!isValid} className="w-full dark:text-white">
                Create Discussion
            </Button>

        </form>
    )
}

export default CreateDiscussion;