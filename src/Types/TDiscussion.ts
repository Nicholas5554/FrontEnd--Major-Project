type TDiscussion = {
    "_id": string,
    "title": string,
    "description": string,
    "content": string,
    userId: {
        name: {
            first: string;
            last: string;
        };
        _id: string;
    }
    "comments": Array<{
        "_id": string,
        userId: {
            name: {
                first: string;
                last: string;
            };
            _id: string;
        }
        "text": string
        "likes": string[]
    }>,
    users: {
        name: {
            first: string;
            last: string;
        };
        _id: string;
    }
}