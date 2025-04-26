
import { FaPencil } from "react-icons/fa6";
import { useMyAssignedTasks } from "../../Hooks/useMyAssignedTasks";
import { PiCursorClickFill } from "react-icons/pi";

const MyAssignedTasks = () => {
    const {
        navToTask,
        searchTasks,
        ChangeStatus
    } = useMyAssignedTasks();


    return (
        <>
            <div className="relative overflow-x-auto w-[95%]">
                <h1 className="mb-2 text-4xl font-bold dark:text-white">My Assigned Tasks</h1>
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Assigning User</th>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Priority</th>
                            <th scope="col" className="px-6 py-3">To Task</th>
                            <th scope="col" className="px-6 py-3">Update Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {searchTasks().map((task: TTask) => (
                            <tr key={task._id} className="bg-white border-b text- dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.userId ? `${task.userId.name.first} ${task.userId.name.last}` : "Unknown"}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.title}
                                </th>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.status}
                                </td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.priority}
                                </td>

                                <td>
                                    <PiCursorClickFill
                                        size={20}
                                        className="text-gray-900 cursor-pointer ml-7 md:ml-9 lg:ml-9 dark:text-white whitespace-nowrap hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                        onClick={() => navToTask(task._id)}
                                    />
                                </td>

                                <td>
                                    <FaPencil
                                        size={20}
                                        className="ml-8 text-gray-900 cursor-pointer md:ml-14 lg:ml-14 dark:text-white whitespace-nowrap hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                        onClick={() => ChangeStatus(task)}
                                    />
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyAssignedTasks;