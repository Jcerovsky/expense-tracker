import { expensesCollectionProps, FetchData } from "../utils/firebase";

import { auth } from "../utils/firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ErrorMessage } from "./ErrorMessage";
import { getDate } from "../utils/getDate";
import { categories } from "../utils/categories";

function Home() {
  const context = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [expensesData, setExpensesData] = useState<expensesCollectionProps[]>(
    [],
  );

  useEffect(() => {
    FetchData()
      .then((data) => {
        setExpensesData(data!);
      })
      .catch((err) => setErrorMsg(err as string));
  }, [context?.userId]);

  const userName = auth.currentUser?.displayName?.split(" ")[0];

  const filteredExpensesByUser = expensesData?.filter(
    (item) => context?.userId === item.uid,
  );
  const sortedExpensesByDate = filteredExpensesByUser.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return (
    <div className="p-3 bg-blue-300 w-full">
      <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      <div className=" ">
        <p>Welcome back {userName}, </p>
        <div className="flex flex-col gap-2">
          {sortedExpensesByDate.map((item) => (
            <div
              className="flex gap-2 border-2 bg-gray-200 rounded-md items-center justify-left p-2 text-2xl"
              id={crypto.randomUUID()}
            >
              <span className="text-4xl bg-purple-700 text-white p-2 rounded-xl">
                {
                  categories[
                    item.category.toLowerCase() as keyof typeof categories
                  ]
                }
              </span>
              <h2 className="ml-2">{item.item}</h2>
              <p>{item.description}</p>
              <p>{item.date === getDate() ? "Today" : item.date}</p>
              <p>${item.cost}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
