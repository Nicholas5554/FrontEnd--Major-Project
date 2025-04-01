export type TUser = {
    "_id": string,
    "name": {
        "first": string,
        "middle": string,
        "last": string,
    },
    "phone": string,
    "email": string,
    "image": {
        "url": string,
        "alt": string,
    },
    "address": {
        "country": string,
        "city": string,
        "street": string,
        "houseNumber": number,
    },
    "isAdmin": boolean,
    "isManager": boolean
}