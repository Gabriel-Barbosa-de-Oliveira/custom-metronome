import { IUser } from "./User.interface";

export interface IAuthContext {
    user: IUser | null;
    onSignOut: () => void;
}

