import React, { createContext, ReactNode, useState } from "react";

interface UserContextProps {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  errorMessage: string | undefined;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const UserContext = createContext<UserContextProps | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  return (
    <UserContext.Provider
      value={{ userId, setUserId, errorMessage, setErrorMessage }}
    >
      {children}
    </UserContext.Provider>
  );
}
