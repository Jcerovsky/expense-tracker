import { expensesCollectionProps, FetchData } from "../utils/firebase";

import { auth } from "../utils/firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ErrorMessage } from "./ErrorMessage";
import { getDate } from "../utils/getDate";
import { categories } from "../utils/categories";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";

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
      <div>
        <p>Welcome back {userName}, </p>
        <div className="flex flex-col gap-2">
          {sortedExpensesByDate.map((item) => (
            <div
              className="flex gap-2 border-2 bg-gray-200 rounded-md items-center justify-left p-2 relative wrap"
              key={crypto.randomUUID()}
            >
              <span className="text-2xl bg-purple-700 text-white p-2 rounded-xl">
                {
                  categories[
                    item.category.toLowerCase() as keyof typeof categories
                  ]
                }
              </span>
              <div className="flex flex-col justify-c ml-4 mt-2">
                <p className="text-xl">{item.item}</p>
                <p>{item.description}</p>
              </div>
              <p className="absolute top-0 left-0.5 text-xs">
                {item.date === getDate() ? "Today" : item.date}
              </p>
              <p className="text-xl bold ml-auto">${formatNumber(item.cost)}</p>
              <div className="flex justify-center items-center absolute top-0.5 right-0.5 p-3 text-sm bg-red-300 w-5 h-5 rounded-full">
                <button className="">X</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
