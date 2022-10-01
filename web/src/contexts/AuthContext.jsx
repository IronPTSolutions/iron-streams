import { createContext, useState, useEffect } from "react";
import { getProfile } from "../services/stream-service";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined means loading

  useEffect(() => {
    getProfile()
      .then((user) => setUser(user))
      .catch((user) => setUser(null));
  }, []);

  const value = {
    user,
    setUser,
  };

  if (user === undefined) {
    return <></>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
