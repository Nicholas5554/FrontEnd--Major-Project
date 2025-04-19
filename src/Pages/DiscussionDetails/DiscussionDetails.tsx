import { Button, Card } from "flowbite-react";
import { discussionDetails } from "../../Hooks/discussionDetails";

const DiscussionDetails = () => {

    const { discussion, navToComments, addComment } = discussionDetails();

    return (
        <Card className="flex items-center justify-center w-auto text-center dark:text-white">
            <h1>Title : {discussion && discussion?.title!}</h1>
            <h2>Created By : {discussion && discussion?.userId.name.first!} {discussion && discussion?.userId.name.last!}</h2>
            <h3>Content : {discussion && discussion?.content!}</h3>
            <p>description : {discussion && discussion?.description!}</p>
            users : {discussion?.users && Array.isArray(discussion.users) && discussion.users.length > 0 ? (
                <ul>
                    {discussion.users.map((user, index) => (
                        <li key={index} className="mt-1 mb-2">
                            {user.name?.first} {user.name?.last}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found</p>
            )}

            <Button onClick={() => { navToComments(discussion?._id ?? "") }} >View comments</Button>
            <Button onClick={() => { addComment() }}>Add Comment </Button>

        </Card>
    )
};

export default DiscussionDetails;