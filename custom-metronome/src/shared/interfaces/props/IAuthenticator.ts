import { IUser } from "../context/User.interface";

export interface IAuthenticator {
    cardState: "login" | "new-user";
    onSignIn?: (user: IUser) => void;
}