import { TUser } from "../../Types/TUser"
import { FaTrash } from "react-icons/fa";
import { crm } from "../../Hooks/usersCrm";
import { FaUser } from "react-icons/fa";



const Crm = () => {
    const {
        searchUsers,
        patchManagerStatus,
        deleteUser
    } = crm();

    return (
        <>
            <div className="relative overflow-x-auto w-[95%]">
                <h1 className="mb-2 text-4xl font-bold dark:text-white">Users Chart</h1>
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3">User Status</th>
                            <th scope="col" className="px-6 py-3">Change Status</th>
                            <th scope="col" className="px-6 py-3">Delete Account</th>
                        </tr>
                    </thead>

                    <tbody>
                        {searchUsers().map((user: TUser) => (
                            <tr key={user._id} className="bg-white border-b text- dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name.first}
                                </th>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.phone}
                                </td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.isManager ? "Manager" : "Personal"}
                                </td>

                                <td>
                                    <FaUser
                                        size={20}
                                        className="ml-8 text-gray-900 cursor-pointer md:ml-9 lg:ml-14 dark:text-white whitespace-nowrap hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                        onClick={() => patchManagerStatus(user)}
                                    />
                                </td>

                                <td>
                                    <FaTrash
                                        size={20}
                                        className="ml-8 text-gray-900 cursor-pointer md:ml-9 lg:ml-14 dark:text-white whitespace-nowrap hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                        onClick={() => deleteUser(user)}
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

export default Crm