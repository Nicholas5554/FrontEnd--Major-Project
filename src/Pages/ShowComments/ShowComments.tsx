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
        <Card className="flex items-center justify-center w-auto text-center dark:text-white">{
            comments?.comments?.map((comment) => {
                return (
                    <div key={comment._id} className="flex flex-col items-center justify-center w-auto text-center dark:text-white">
                        <p>
                            User: {comment.userId && comment.userId.name
                                ? `${comment.userId.name.first || "Unknown"} ${comment.userId.name.last || "User"}`
                                : "User not found"}
                        </p>

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