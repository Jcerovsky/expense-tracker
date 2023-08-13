import React, { createContext, ReactNode, useContext, useState } from "react";
import { expensesCollectionProps, FetchData } from "../utils/firebase";

export interface UserContextProps {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  errorMessage: string | undefined;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  expensesData: expensesCollectionProps[];
  setExpensesData: React.Dispatch<
    React.SetStateAction<expensesCollectionProps[]>
  >;
  fetchData: () => void;
  filteredByUser: expensesCollectionProps[];
}

export const UserContext = createContext<UserContextProps | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [expensesData, setExpensesData] = useState<expensesCollectionProps[]>(
    [],
  );
  const context = useContext(UserContext);

  const fetchData = () => {
    FetchData(context)
      .then((data) => {
        setExpensesData(data!);
      })
      .catch((err) => setErrorMessage(err as string));
  };

  const filteredByUser = expensesData?.filter((item) => userId === item.uid);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        errorMessage,
        setErrorMessage,
        expensesData,
        setExpensesData,
        fetchData,
        filteredByUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
