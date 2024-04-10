import { createContext } from "react";

const AuthContext = createContext([
  {},
  (obj) => {
    return { ...obj };
  }
]);

export default AuthContext;
