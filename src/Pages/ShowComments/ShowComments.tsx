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
        <div className="flex flex-col items-center justify-center w-auto text-center dark:text-white">{
            comments?.comments?.map((comment) => {
                return (
                    <div key={comment._id} className="flex flex-col items-center justify-center w-auto mb-2 text-center dark:text-white">
                        <Card className="w-auto mt-3 h-28">
                            <div className="flow-root">
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 w-48">
                                                <p className="text-lg font-medium text-gray-900 truncate dark:text-white">{comment.userId.name.first} {comment.userId.name.last}</p>
                                                <p className="text-gray-500 truncate text-md dark:text-gray-400">{comment.text}</p>
                                                <div className="flex flex-row items-center justify-center w-auto mt-2 text-center dark:text-white">
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
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Card>


                    </div>
                );
            })
        }</div>
    )
};

export default ShowComments;