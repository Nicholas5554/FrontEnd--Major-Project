import { Card } from "flowbite-react";
import { showComments } from "../../Hooks/showComments";
import { IoHeartSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/bigPie";

const ShowComments = () => {

    const { comments, likeComment, deleteComment, userId } = showComments();
    const user = useSelector((state: TRootState) => state.userSlice.user);


    return (
        <Card className="flex flex-col items-center justify-center w-auto text-center dark:text-white">{
            comments?.comments?.map((comment) => {
                return (
                    <div key={comment._id} className="flex flex-col items-center justify-center w-auto mb-2 text-center border-b-2 dark:text-white">
                        {/* <p>
                            User: {comment.userId && comment.userId.name
                                ? `${comment.userId.name.first || "Unknown"} ${comment.userId.name.last || "User"}`
                                : "User not found"}
                        </p> */}

                        <Card className="max-w-sm">
                            <div className="flow-root">
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{comment.userId.name.first} {comment.userId.name.last}</p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">email@windster.com</p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Card>

                        <p className="mt-1 mb-2">Text : {comment?.text}</p>
                        <div className="flex flex-row items-center justify-center w-auto text-center dark:text-white">

                            <IoHeartSharp
                                onClick={() => likeComment(comment)}
                                className={`hover:cursor-pointer size-9 ${comment.likes?.includes(userId || "") ? "text-red-500" : "text-grey-500"}`}
                            />
                            {(user?._id == comment.userId._id) && <FaTrash
                                size={20}
                                className="ml-2 text-gray-900 cursor-pointer size-8 whitespace-nowrap dark:text-white hover:text-slate-600 active:text-slate-500 dark:hover:text-slate-300 dark:active:text-slate-400"
                                onClick={() => deleteComment(comment)}
                            />}
                        </div>
                    </div>
                );
            })
        }</Card>
    )
};

export default ShowComments;