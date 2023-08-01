import { expensesCollectionProps, FetchData } from "../utils/firebase";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ErrorMessage } from "./ErrorMessage";
import { getDate } from "../utils/getDate";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";
import ExpenseIncomeItem from "./ExpenseIncomeItem";

function Home() {
  const context = useContext(UserContext);
  const [expensesData, setExpensesData] = useState<expensesCollectionProps[]>(
    [],
  );
  const [spendingToday, setSpendingToday] = useState<string>("");

  const fetchData = () => {
    FetchData()
      .then((data) => {
        setExpensesData(data!);
      })
      .catch((err) => context?.setErrorMessage(err as string));
  };

  useEffect(() => {
    fetchData();
  }, [context?.userId]);

  const filteredByUser = expensesData?.filter(
    (item) => context?.userId === item.uid,
  );
  const sortedByDate = filteredByUser.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const filteredByDate = sortedByDate.filter((item) => item.date === getDate());

  useEffect(() => {
    const filtered = filteredByDate.reduce((total, acc) => total + acc.cost, 0);
    setSpendingToday(formatNumber(filtered));
  }, [filteredByDate]);

  return (
    <div className="p-3 bg-blue-300 w-full">
      <ErrorMessage
        errorMessage={context?.errorMessage}
        setErrorMessage={context?.setErrorMessage}
      />
      <div>
        <div className="bg-teal-300 p-1 pl-4 pr-4 text-xs rounded-2xl inline-flex gap-1 items-center justify-center mb-3">
          <p>Spending today</p>
          <p className="mr-auto">${spendingToday}</p>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {sortedByDate.map((item) => (
            <ExpenseIncomeItem
              item={item}
              fetchData={fetchData}
              key={crypto.randomUUID()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
