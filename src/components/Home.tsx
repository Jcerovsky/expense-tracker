import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ErrorMessage } from "./ErrorMessage";
import { getDate } from "../utils/getDate";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";
import ExpenseIncomeItem from "./ExpenseIncomeItem";
import { useNavigate } from "react-router-dom";
import NoData from "./NoData";
import Loading from "./Loading";

function Home() {
  const context = useContext(UserContext);
  const [spendingToday, setSpendingToday] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    context?.fetchData();
    setIsLoading(false);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-3 bg-blue-300 w-full h-screen">
      <ErrorMessage
        errorMessage={context?.errorMessage}
        setErrorMessage={context?.setErrorMessage}
      />
      <div>
        <div className="p-4 rounded-lg bg-gradient-to-r from-teal-300 to-blue-600 flex items-center justify-between mb-5 shadow-md">
          <div className="p-4 bg-white rounded-md flex flex-col">
            <p className="text-gray-700 font-semibold">Today's Spending</p>
            <p className="text-teal-600 font-bold text-xl">${spendingToday}</p>
          </div>

          <div className="flex">
            <button
              className=" text-4xl w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full transition duration-300 ease-in-out shadow-md"
              onClick={() => navigate("/form")}
            >
              +
            </button>
          </div>
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
