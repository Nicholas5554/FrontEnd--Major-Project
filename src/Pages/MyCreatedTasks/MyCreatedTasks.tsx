import { Card, Pagination } from "flowbite-react";
import { BiPlus } from "react-icons/bi";
import { myCreatedTasks } from "../../Hooks/myCreatedTasks";

const MyCreatedTasks = () => {

    const {
        user,
        navToTask,
        deleteTask,
        editTask,
        navToCreateTask,
        currentPage,
        totalPages,
        onPageChange,
        currentTasks,
        ChangeStatus
    } = myCreatedTasks();

    return (
        <div className="flex flex-col items-center justify-start gap-2 text-center dark:text-white">
            <h1 className="text-2xl">My Created Tasks</h1>
            <p className="text-lg">These are the tasks that you created</p>

            <div className="flex flex-wrap items-center justify-center gap-4 w-1/1">
                {currentTasks.map((task: TTask) => {
                    return (
                        <Card key={task._id} className="flex items-center justify-center w-auto text-center">
                            <h1>Title : {task.title}</h1>
                            <h3> Assigned To : {task.assignedTo}</h3>
                            <h3>Status : {task.status}</h3>
                            <button className="w-full h-10 text-sm text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800" onClick={() => navToTask(task._id)}>To Task</button>

                            <button className="w-full h-10 text-sm text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800" onClick={() => editTask(task._id)}>Edit Task</button>

                            <button className="w-full h-10 text-sm text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800" onClick={() => ChangeStatus(task)}>Change Status</button>

                            <button className="w-full h-10 text-sm text-white transition-colors bg-red-600 rounded-md hover:bg-red-700 active:bg-red-800" onClick={() => deleteTask(task)}>Delete Task</button>

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
            {user.user?.isManager && <div className="flex items-center justify-center p-3 text-white transition-colors bg-gray-500 rounded-full cursor-pointer hover:bg-gray-600 active:bg-gray-700" onClick={navToCreateTask}>
                <p className="text-lg font-semibold">Create a new Task</p>
                <BiPlus
                    size={35}
                />
            </div>}
        </div>
    );
};

export default MyCreatedTasks;