type TDiscussion = {
    "_id": string,
    "title": string,
    "description": string,
    "content": string,
    "userId": string,
    "comments": Array<{
        "_id": string,
        "userId": string,
        "text": string
        "likes": Array<{ userId: string }>
    }>,
    "users": Array<{ userId: string }>,
}