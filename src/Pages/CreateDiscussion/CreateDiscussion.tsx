import { FloatingLabel, Button } from "flowbite-react";
import { createDiscussion } from "../../Hooks/createDiscussion";
import { TWorker } from "../../Types/Tworker";


const CreateDiscussion = () => {

    const {
        onSubmit,
        errors,
        isValid,
        register,
        handleSubmit,
        navToMyDiscussions,
        workers
    }: {
        onSubmit: any,
        errors: any,
        isValid: boolean,
        register: any,
        handleSubmit: any,
        navToMyDiscussions: any,
        workers: TWorker[];
    } = createDiscussion();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1">

            <h1 className="text-2xl font-bold dark:text-white">Create Discussion</h1>

            <div className="flex flex-row justify-around gap-11 w-80">
                <div className="flex flex-col w-full">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Title"
                        {...register("title")}
                    />
                    <span className="w-32 text-sm text-red-500">{errors.title?.message}</span>
                </div>

                <div className="flex flex-col w-full">
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
                <div className="flex flex-col w-full">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Description"
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

            <button className="w-full h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToMyDiscussions}>Go Back</button>

            <Button type="submit" disabled={!isValid} className="w-full dark:text-white">
                Create Discussion
            </Button>

        </form>
    )
}

export default CreateDiscussion;