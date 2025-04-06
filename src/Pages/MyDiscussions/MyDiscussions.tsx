import { Card, Pagination } from "flowbite-react";
import { myDiscussions } from "../../Hooks/myDiscussions";

const MyDiscussions = () => {

    const {
        currentPage,
        totalPages,
        onPageChange,
        currentDiscussions,
        deleteDiscussion,
        navToDiscussion
    } = myDiscussions();

    return (
        <div className="flex flex-col items-center justify-start gap-2 text-center dark:text-white">
            <h1 className="text-2xl">My Discussions</h1>
            <p className="text-lg">These are the Discussions that you got added to</p>

            <div className="flex flex-wrap items-center justify-center gap-4 w-1/1">
                {currentDiscussions.map((discussion: TDiscussion) => {
                    return (
                        <Card key={discussion._id} className="flex items-center justify-center w-auto text-center">
                            <h1>Title : {discussion.title}</h1>
                            <h3>Content : {discussion.content}</h3>
                            <h3>Description : {discussion.description} </h3>
                            <button className="w-full h-10 text-sm text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800" onClick={() => navToDiscussion(discussion._id)}>To Discussion</button>

                            <button className="w-full h-10 text-sm text-white transition-colors bg-red-600 rounded-md hover:bg-red-700 active:bg-red-800" onClick={() => deleteDiscussion(discussion)}>Leave Discussion</button>

                        </Card>
                    )
                })}
            </div>

            <Pagination className="mb-5"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
            />
        </div>
    );
};

export default MyDiscussions;