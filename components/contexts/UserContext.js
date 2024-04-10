import { createContext } from "react";

const UserContext = createContext([
  {},
  (obj) => {
    return { ...obj };
  }
]);

export default UserContext;
