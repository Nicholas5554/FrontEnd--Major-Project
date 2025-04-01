import { jwtDecode } from "jwt-decode";
import { TDecodedToken } from "../Types/DecodedToken";

export const decode = (token: string) => {
    return jwtDecode(token) as TDecodedToken;
};
