import React, { createContext, ReactNode, useState } from "react";

interface UserContextProps {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextProps | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
