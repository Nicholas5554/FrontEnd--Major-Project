type TTask = {
    "_id": string,
    "title": string,
    "type": string,
    userId: {
        name: {
            first: string;
            last: string;
        };
        _id: string;
    },
    assignedTo: {
        name: {
            first: string;
            last: string;
        };
        _id: string;
    }
    "status": string,
    "priority": string,
    "description": string
}
