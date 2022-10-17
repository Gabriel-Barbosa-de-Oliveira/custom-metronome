import React, { useContext } from "react";
import { IAuthContext } from "../interfaces/context/AuthContext.interface";


export const authContext = React.createContext<IAuthContext>({
  user: {
    name: "Anônimo",
    email: "",
  },
  onSignOut: () => {},
});

export function useAuthContext() {
  return useContext(authContext);
}