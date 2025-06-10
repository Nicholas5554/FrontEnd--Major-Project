import { FloatingLabel, Button } from "flowbite-react";
import { editTask } from "../../Hooks/editTask";

const EditTask = () => {
    const {
        tasks,
        onSubmit,
        navToMyTasks,
        register,
        handleSubmit,
        errors,
        isValid,
    } = editTask();

    return (
        <>
            <form className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-bold dark:text-white">Edit Task</h1>

                <div className="flex flex-row justify-around gap-11 w-80">
                    <div className="flex flex-col">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="title"
                            defaultValue={tasks?.title || ""}
                            {...register("title")}
                        />
                        <span className="w-32 text-sm text-red-500">{errors.title?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="Type"
                            defaultValue={tasks?.type || ""}
                            {...register("type")}
                        />
                        <span className="w-32 text-sm text-red-500">{errors.type?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-around gap-11 w-80">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="Assigned To (User ID)"
                            defaultValue={tasks?.assignedTo._id || ""}
                            {...register("assignedTo")}
                        />
                        <span className="w-32 text-sm text-red-500">{errors.assignedTo?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="Status"
                            defaultValue={tasks?.status || ""}
                            {...register("status")}
                        />

                        <span className="w-32 text-sm text-red-500">{errors.status?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-around gap-11 w-80">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="Priority"
                            defaultValue={tasks?.priority || ""}
                            {...register("priority")}
                        />
                        <span className="w-32 text-sm text-red-500">{errors.priority?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="Description"
                            defaultValue={tasks?.description || ""}
                            {...register("description")}
                        />
                        <span className="w-32 text-sm text-red-500">{errors.description?.message}</span>
                    </div>
                </div>

                <button className="w-full h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToMyTasks}>Go Back</button>

                <Button type="submit" disabled={!isValid} className="w-full dark:text-white">Save Task</Button>
            </form>
        </>
    );
};

export default EditTask;