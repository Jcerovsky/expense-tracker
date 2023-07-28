import { expensesCollectionProps, FetchData } from "../utils/firebase";

import { auth } from "../utils/firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ErrorMessage } from "./ErrorMessage";

function Home() {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [expensesData, setExpensesData] = useState<expensesCollectionProps[]>(
    [],
  );
  const context = useContext(UserContext);

  useEffect(() => {
    FetchData()
      .then((data) => {
        setExpensesData(data!);
      })
      .catch((err) => setErrorMsg(err as string));
  }, [context?.userId]);

  const userName = auth.currentUser?.displayName?.split(" ")[0];

  return (
    <div className="p-3 bg-blue-300 w-full">
      <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      <div className=" ">
        <p>Welcome back {userName}, </p>
        <div className="flex flex-col gap-2">
          {expensesData
            ?.filter((item) => context?.userId === item.uid)
            .map((item) => (
              <div
                className="flex gap-2 border-2 rounded-l items-center justify-left p-1"
                id={crypto.randomUUID()}
              >
                <h1>{item.item}</h1>
                <p>{item.cost}</p>
                <p>{item.date}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
