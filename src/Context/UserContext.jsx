import { createContext, useEffect, useState, useMemo } from "react";

export const UserContext = createContext();
UserContext.displayName = "UserContext";

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    }
  }, []);

  const setToken = (token) => {
    setUserToken(token);
    if (token) {
      localStorage.setItem("userToken", token);
    } else {
      localStorage.removeItem("userToken");
    }
  };

  const contextValue = useMemo(() => ({ userToken, setToken }), [userToken]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
