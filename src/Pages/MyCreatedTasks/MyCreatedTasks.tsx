import { myCreatedTasks } from "../../Hooks/myCreatedTasks";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { PiCursorClickFill } from "react-icons/pi";
import { SlEqualizer } from "react-icons/sl";

const MyCreatedTasks = () => {

    const {
        navToTask,
        deleteTask,
        editTask,
        ChangeStatus,
        searchTasks
    } = myCreatedTasks();

    return (
        <>
            <div className="relative overflow-x-auto w-[90%]">
                <h1 className="mb-2 text-4xl font-bold dark:text-white">My Created Tasks</h1>
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Assigned To</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Priority</th>
                            <th scope="col" className="px-6 py-3">To Task</th>
                            <th scope="col" className="px-6 py-3">Edit Task</th>
                            <th scope="col" className="px-6 py-3">Update Status</th>
                            <th scope="col" className="px-6 py-3">Delete Task</th>
                        </tr>
                    </thead>

                    <tbody>
                        {searchTasks().map((task: TTask) => (
                            <tr key={task._id} className="bg-white border-b text- dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                    {task.title}
                                </th>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.assignedTo ? `${task.assignedTo.name.first} ${task.assignedTo.name.last}` : "Unassigned"}
                                </td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.status}
                                </td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.priority}
                                </td>

                                <td>
                                    <PiCursorClickFill
                                        size={20}
                                        className="ml-12 text-gray-900 cursor-pointer dark:text-white whitespace-nowrap hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                        onClick={() => navToTask(task._id)}
                                    />
                                </td>
                                <td>
                                    <SlEqualizer
                                        size={20}
                                        className="ml-12 text-gray-900 cursor-pointer dark:text-white whitespace-nowrap hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                        onClick={() => editTask(task._id)}
                                    />
                                </td>
                                <td>
                                    <FaPencil
                                        size={20}
                                        className="ml-12 text-gray-900 cursor-pointer dark:text-white whitespace-nowrap hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                        onClick={() => ChangeStatus(task)}
                                    />
                                </td>

                                <td>
                                    <FaTrash
                                        size={20}
                                        className="ml-12 text-gray-900 cursor-pointer whitespace-nowrap dark:text-white hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                        onClick={() => deleteTask(task)}
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

export default MyCreatedTasks;