import { Card } from "flowbite-react";
import { showComments } from "../../Hooks/showComments";
import { IoHeartSharp } from "react-icons/io5";

const ShowComments = () => {

    const { comment, likeComment } = showComments();

    return (
        <Card className="flex items-center justify-center w-auto text-center dark:text-white">
            <h1>{comment?.comments.map((comment) => {
                return (
                    <div key={comment._id} className="flex flex-col items-center justify-center w-auto text-center dark:text-white">
                        <p>User Id : {comment.userId}</p>
                        <p>Text : {comment?.text}</p>
                        <IoHeartSharp onClick={() => { likeComment() }} className="hover:cursor-pointer size-9">like comment</IoHeartSharp>
                    </div>
                )
            })}</h1>
        </Card>
    )
};

export default ShowComments;