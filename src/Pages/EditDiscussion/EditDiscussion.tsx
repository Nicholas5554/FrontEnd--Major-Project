import { FloatingLabel, Button } from "flowbite-react";
import { editDiscussion } from "../../Hooks/editDiscussion";
import { TWorker } from "../../Types/Tworker";


const EditDiscussionDetails = () => {

    const { discussion,
        submitForm,
        errors,
        isValid,
        register,
        handleSubmit,
        workers
    }: {
        discussion: any,
        submitForm: any,
        errors: any,
        isValid: boolean,
        register: any,
        handleSubmit: any,
        workers: TWorker[];
    }
        = editDiscussion();



    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1">

            <h1 className="text-2xl font-bold dark:text-white">Edit Discussion Details</h1>

            <div className="flex flex-row justify-around w-full gap-11">
                <div className="flex flex-col w-full">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Title"
                        defaultValue={discussion?.title || ""}
                        {...register("title")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.title?.message}</span>
                </div>

                <div className="flex flex-col w-full">
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

            <div className="flex flex-row justify-around w-full gap-11">
                <div className="flex flex-col w-full">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Description"
                        defaultValue={discussion?.description || ""}
                        {...register("description")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.description?.message}</span>
                </div>

                <div className="flex flex-col w-full">
                    <label className="mb-2 text-sm dark:text-white">Add Users:</label>
                    <div className="flex flex-col gap-2 p-2 overflow-y-auto border rounded-md max-h-40 dark:border-gray-600">
                        {workers.map(worker => (
                            <div key={worker._id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={worker._id}
                                    value={worker._id}
                                    {...register("users")}
                                    className="w-4 h-4 rounded form-checkbox text-neutral-600 dark:text-neutral-400 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor={worker._id} className="dark:text-white">
                                    {worker.name.first} {worker.name.last}
                                </label>
                            </div>
                        ))}
                    </div>
                    <span className="w-32 text-sm text-red-500">{errors.users?.message}</span>
                </div>
            </div>

            <Button type="submit" disabled={!isValid} onClick={() => {
                console.log(errors);
            }} className="w-full dark:text-white">
                Save Changes
            </Button>

        </form>
    )
}

export default EditDiscussionDetails;