import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ErrorMessage } from "./ErrorMessage";
import { getDate } from "../utils/getDate";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";
import ExpenseIncomeItem from "./ExpenseIncomeItem";
import { useNavigate } from "react-router-dom";
import NoData from "./NoData";

function Home() {
  const context = useContext(UserContext);
  const [spendingToday, setSpendingToday] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    context?.fetchData();
  }, []);

  const sortedByDate = useMemo(() => {
    if (context?.filteredByUser) {
      return context.filteredByUser.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }
    return [];
  }, [context?.filteredByUser]);

  const filteredByDate = useMemo(() => {
    if (sortedByDate) {
      return sortedByDate.filter((item) => item.date === getDate());
    }
    return [];
  }, [sortedByDate]);

  useEffect(() => {
    const filtered = filteredByDate
      .filter((item) => item.category !== "Income")
      .reduce((total, acc) => total + acc.cost, 0);
    setSpendingToday(formatNumber(filtered));
  }, [filteredByDate]);

  if (!context?.filteredByUser || context?.filteredByUser.length === 0) {
    return <NoData />;
  }

  return (
    <div className="p-3 bg-blue-300 w-full">
      <ErrorMessage
        errorMessage={context?.errorMessage}
        setErrorMessage={context?.setErrorMessage}
      />
      <div>
        <div className="p-2 pl-4 pr-4 text-sm rounded-lg flex gap-2 items-center justify-between mb-3 bg-gradient-to-r from-teal-200 to-teal-300">
          <div className="flex flex-col p-2 bg-white rounded-md">
            <p className="text-gray-700 font-semibold">Spending today</p>
            <p className="text-teal-600 font-bold">${spendingToday}</p>
          </div>

          <button
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition duration-300 ease-in-out"
            onClick={() => navigate("/form")}
          >
            Add more
          </button>
        </div>

        <div className="flex flex-col gap-5 mt-4">
          {sortedByDate.map((item) => (
            <ExpenseIncomeItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
