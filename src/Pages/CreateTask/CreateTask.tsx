import { FloatingLabel, Button } from "flowbite-react";
import { createTask } from "../../Hooks/createTask";
import { TWorker } from "../../Types/Tworker";


const CreateTask = () => {
    const {
        register,
        handleSubmit,
        errors,
        isValid,
        onSubmit,
        navToMyTasks,
        workers
    }: {
        register: any;
        handleSubmit: any;
        errors: any;
        isValid: boolean;
        onSubmit: any;
        navToMyTasks: any;
        workers: TWorker[];
    } = createTask();

    return (
        <>
            <form className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-bold dark:text-white">Create Task</h1>

                <div className="flex flex-row justify-around w-full gap-11">
                    <div className="flex flex-col w-full">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="title"
                            {...register("title")}
                        />
                        <span className="w-32 text-sm text-red-500">{errors.title?.message}</span>
                    </div>

                    <div className="flex flex-col w-full">
                        <select className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            defaultValue=""
                            {...register("assignedTo")}
                        >
                            <option value="" disabled>Select Worker</option>
                            {workers.map(worker => (
                                <option key={worker._id} value={worker._id}>
                                    {worker.name.first} {worker.name.last}
                                </option>
                            ))}
                        </select>
                        <span className="w-32 text-sm text-red-500">{errors.assignedTo?.message}</span>
                    </div>

                </div>

                <div className="flex flex-row justify-around w-full gap-11">

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
                        <select className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            type="text"
                            variant="standard"
                            label="Priority"
                            {...register("priority")}
                        >
                            <option value="" disabled>Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                        <span className="w-32 text-sm text-red-500">{errors.priority?.message}</span>
                    </div>

                </div>

                <button className="w-full h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToMyTasks}>Go Back</button>
                <Button type="submit" disabled={!isValid} className="w-full dark:text-white">Create Task</Button>

            </form>
        </>
    );
};

export default CreateTask;