export type TUser = {
    "_id": string,
    "name": {
        "first": string,
        "last": string,
    },
    "email": string,
    "password": string,
    "isAdmin": boolean,
    "photoFile"?: string,
    "isManager": boolean
}