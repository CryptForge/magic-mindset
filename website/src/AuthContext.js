import { createContext } from "react";

export const AuthContext = createContext({
  authenticated: false,
  info: null,
});