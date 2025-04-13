import { Button, Card } from "flowbite-react";
import { discussionDetails } from "../../Hooks/discussionDetails";

const DiscussionDetails = () => {

    const { discussion, navToComments } = discussionDetails();

    return (
        <Card className="flex items-center justify-center w-auto text-center dark:text-white">
            <h1>Title: {discussion && discussion?.title!}</h1>
            <h3>Content: {discussion && discussion?.content!}</h3>
            <p>description: {discussion && discussion?.description!}</p>
            Comments: {discussion?.comments && discussion.comments.length > 0 ? (
                <ul>
                    {discussion.comments.map((comment, index) => (
                        <>
                            <li>{comment.userId}</li>
                            <li key={index}>{comment.text} </li>
                        </>
                    ))}
                </ul>
            ) : (
                <p>No comments yet</p>
            )}
            users: {discussion?.users && discussion.users.length > 0 ? (
                <ul>
                    {discussion?.users.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            ) : (
                <p>No users found</p>
            )}

            <Button onClick={() => { navToComments(discussion?._id ?? "") }} >View only comments</Button>

        </Card>
    )
};

export default DiscussionDetails;