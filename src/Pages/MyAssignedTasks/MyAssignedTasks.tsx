import { Button, Card, Pagination } from "flowbite-react";
import { FaPencil } from "react-icons/fa6";
import { useMyAssignedTasks } from "../../Hooks/useMyAssignedTasks";

const MyAssignedTasks = () => {
    const {
        navToTask,
        currentPage,
        totalPages,
        onPageChange,
        currentTasks,
    } = useMyAssignedTasks();

    return (
        <div className="flex flex-col items-center justify-start gap-2 text-center dark:text-white">
            <h1 className="text-2xl">My Assigned Tasks</h1>
            <p className="text-lg">These are the tasks that you need to get done with</p>

            <div className="flex flex-wrap items-center justify-center gap-4 w-1/1">
                {currentTasks.map((task: TTask) => {
                    return (
                        <Card key={task._id} className="flex items-center justify-center w-auto text-center">
                            <h1>Title : {task.title}</h1>
                            <Button onClick={() => navToTask(task._id)}>to tesk</Button>
                            <FaPencil
                                size={30}
                                className="m-auto cursor-pointer hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                            />
                        </Card>
                    )
                })}
            </div>

            <Pagination className="mb-5"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
            />
        </div>
    );
};

export default MyAssignedTasks;