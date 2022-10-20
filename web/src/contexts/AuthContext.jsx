import { createContext, useState, useEffect } from "react";
import { getProfile } from "../services/stream-service";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined means loading

  useEffect(() => {
    const isLoaded = localStorage.getItem('user-loaded') === 'true';
    if (isLoaded) {
      getProfile()
        .then((user) => setUser(user))
        .catch((user) => setUser(null));
    } else {
      setUser(null)
    }
  }, []);

  const updateUser = (user) => {
    localStorage.setItem('user-loaded', 'true');
    setUser(user);
  }

  const value = {
    user,
    setUser: updateUser,
  };

  if (user === undefined) {
    return <></>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
