import { FaDoorOpen } from "react-icons/fa";
import { myDiscussions } from "../../Hooks/myDiscussions";
import { PiCursorClickFill } from "react-icons/pi";

const MyDiscussions = () => {

    const {
        deleteDiscussion,
        navToDiscussion,
        searchDiscussions
    } = myDiscussions();

    return (
        <>
            <div className="relative overflow-x-auto w-[80%]">
                <h1 className="mb-2 text-4xl font-bold dark:text-white">My Discussions</h1>
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">content</th>
                            <th scope="col" className="px-6 py-3">To Discussion</th>
                            <th scope="col" className="px-6 py-3">Leave Discussion</th>
                        </tr>
                    </thead>

                    <tbody>
                        {searchDiscussions().map((discussion: TDiscussion) => (
                            <tr key={discussion._id} className="bg-white border-b text- dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {discussion.title}
                                </th>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {discussion.content}
                                </td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <PiCursorClickFill
                                        size={20}
                                        className="ml-12 text-gray-900 cursor-pointer whitespace-nowrap dark:text-white hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                        onClick={() => { navToDiscussion(discussion._id) }}
                                    />
                                </td>
                                <td>
                                    <FaDoorOpen
                                        size={20}
                                        className="ml-12 text-gray-900 cursor-pointer whitespace-nowrap dark:text-white hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                        onClick={() => deleteDiscussion(discussion)}
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

export default MyDiscussions;