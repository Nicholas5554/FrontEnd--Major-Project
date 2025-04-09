import { Card } from "flowbite-react";
import { showComments } from "../../Hooks/showComments";
import { IoHeartSharp } from "react-icons/io5";

const ShowComments = () => {

    const { comments, likeComment } = showComments();

    const currentUserId = JSON.parse(localStorage.getItem("user") || "{ }")._id;

    return (
        <Card className="flex items-center justify-center w-auto text-center dark:text-white">{
            comments?.comments.map((comment) => {
                const liked = comment.likes.includes(currentUserId);
                return (
                    <div key={comment._id} className="flex flex-col items-center justify-center w-auto text-center dark:text-white">
                        <p>User Id : {comment.userId}</p>
                        <p>Text : {comment?.text}</p>
                        <IoHeartSharp
                            onClick={() => likeComment(comment)}
                            className={`hover:cursor-pointer size-9 ${liked ? "text-red-500" : "text-white"}`}
                        />
                    </div>
                );
            })
        }</Card>
    )
};

export default ShowComments;