import { IUser } from "../context/User.interface";

export interface ILoginScreenProps {
    onSignIn?: (user: IUser) => void;
}