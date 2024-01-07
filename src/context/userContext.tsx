import React, { createContext, useState, FC, ReactNode } from "react";

interface User {
  email: string;
  auth: boolean;
}

interface UserContextType {
  user?: User; // Make user property optional
  login: (email: string, token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: { email: "", auth: false },
  login: () => {},
  logout: () => {},
});

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ email: "", auth: false });

  const login = (email: string, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUser((user) => ({
      email: email,
      auth: true,
    }));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  const contextValue: UserContextType = { user, login, logout };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
