import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ErrorMessage } from "./ErrorMessage";
import { getDate } from "../utils/getDate";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";
import ExpenseIncomeItem from "./ExpenseIncomeItem";
import { useNavigate } from "react-router-dom";

function Home() {
  const context = useContext(UserContext);
  const [spendingToday, setSpendingToday] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    context?.fetchData();
  }, [context?.userId]);

  const sortedByDate = context?.filteredByUser.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const filteredByDate = sortedByDate!.filter(
    (item) => item.date === getDate(),
  );

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
        <div className=" p-1 pl-4 pr-4 text-xs rounded-2xl flex gap-1 items-start justify-center mb-3">
          <div className="flex self-center p-2 bg-teal-300 rounded-md">
            <p className="">Spending today</p>
            <p className="mr-auto">${spendingToday}</p>
          </div>

          <button
            className="ml-auto p-2 self-center bg-teal-300 rounded-md"
            onClick={() => navigate("/form")}
          >
            test
          </button>
        </div>
        <div className="flex flex-col gap-5 mt-4">
          {sortedByDate!.map((item) => (
            <ExpenseIncomeItem item={item} key={crypto.randomUUID()} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
