import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserContext } from "../context/UserContext";
import { calculateDateFromTimeframe } from "../utils/calculateDateFromTimeframe";
import ExpenseIncomeItem from "./ExpenseIncomeItem";
import { expensesCollectionProps } from "../utils/firebase";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";
import NoData from "./NoData";
import { getDate } from "../utils/getDate";

function Dashboard() {
  const context = useContext(UserContext);
  const inputRefFrom = useRef<HTMLInputElement>(null);
  const inputRefTo = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const [originalItems, setOriginalItems] = useState<
    expensesCollectionProps[] | undefined
  >(context?.filteredByUser);
  const [filteredItems, setFilteredItems] = useState<
    expensesCollectionProps[] | undefined
  >(context?.filteredByUser);
  const [isCalendarTicked, setIsCalendarTicked] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    const sortedItems = context?.filteredByUser.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    setFilteredItems(sortedItems);
    setOriginalItems(sortedItems);
  }, [context?.filteredByUser]);

  useEffect(() => {
    context?.fetchData();
  }, []);

  const getItemsFromButtonSelection = useCallback(
    (date: "week" | "month" | "year" | "future" | "today" | "all") => {
      if (date === "future") {
        const filtered = context?.filteredByUser.filter(
          (item) => item.date > getDate(),
        );
        setFilteredItems(filtered);
        setOriginalItems(filtered);
      } else if (date === "today") {
        const filtered = context?.filteredByUser.filter(
          (item) => item.date === getDate(),
        );
        setFilteredItems(filtered);
        setOriginalItems(filtered);
      } else if (date === "all") {
        setFilteredItems(context?.filteredByUser);
      } else {
        const filtered = context?.filteredByUser
          ?.filter(
            (item) =>
              item.date > calculateDateFromTimeframe(date) &&
              item.date <= getDate(),
          )
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );

        setFilteredItems(filtered);
        setOriginalItems(filtered);
      }
      setIsCalendarTicked(false);
      checkboxRef.current!.checked = false;
    },
    [context?.filteredByUser],
  );

  const getIncomeOrExpenses = (category: "Income" | "Expenses" | "all") => {
    if (category === "Income") {
      setFilteredItems(
        originalItems?.filter((item) => item.category === "Income"),
      );
    } else if (category === "Expenses") {
      setFilteredItems(
        originalItems?.filter((item) => item.category !== "Income"),
      );
    } else {
      setFilteredItems(originalItems);
    }
  };

  const getSpendingAmount = () => {
    if (filteredItems) {
      return filteredItems
        ?.filter((item) => item.category !== "Income")
        .reduce((a, b) => a + b.cost, 0);
    }
    return 0;
  };

  const getIncomeAmount = () => {
    if (filteredItems) {
      return filteredItems
        ?.filter((item) => item.category === "Income")
        .reduce((a, b) => a + b.cost, 0);
    }
    return 0;
  };

  const getFilteredItemsFromCalendarSelection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setFilteredItems(
      originalItems
        ?.filter((item) => inputRefFrom.current!.value <= item.date)
        .filter((item) => inputRefTo.current!.value >= item.date),
    );
    setOriginalItems(
      context?.filteredByUser
        .filter((item) => inputRefFrom.current!.value <= item.date)
        .filter((item) => inputRefTo.current!.value >= item.date),
    );
  };

  const handleCalendarTicked = () => {
    isCalendarTicked && setFilteredItems(context?.filteredByUser);
    setIsCalendarTicked((prevState) => !prevState);
  };

  if (!context?.filteredByUser || context?.filteredByUser.length === 0) {
    return <NoData />;
  }

  const wordingForSelectedOption =
    selectedOption === "today"
      ? "Cash flow today"
      : selectedOption === "future"
      ? "Future cash flow"
      : selectedOption === "all"
      ? "Total cash flow"
      : `Total cash flow in the last ${selectedOption}`;

  return (
    <div className="bg-gray-100 p-5">
      <div className=" bg-white rounded-lg shadow-md p-6 space-y-4 mb-5 sm:flex sm:gap-2">
        <div className="flex flex-col gap-2 max-w-xs ml-auto mr-auto flex-1">
          <button
            onClick={() => getIncomeOrExpenses("all")}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            See all
          </button>
          <button
            onClick={() => getIncomeOrExpenses("Income")}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Income
          </button>
          <button
            onClick={() => getIncomeOrExpenses("Expenses")}
            className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800"
          >
            Expenses
          </button>
        </div>
        <div>
          <label htmlFor="timeframe" className="block text-gray-600 mb-1">
            See movement for
          </label>
          <select
            id="timeframe"
            className="border rounded p-2 w-full text-gray-700"
            onChange={(e) => {
              getItemsFromButtonSelection(
                e.target.value as
                  | "week"
                  | "month"
                  | "year"
                  | "future"
                  | "today"
                  | "all",
              );
              setSelectedOption(e.target.value);
            }}
          >
            <option value="">Select</option>
            <option value="today">Today</option>
            <option value="week">Last week</option>
            <option value="month">Last month</option>
            <option value="year">Last year</option>
            <option value="future">Future</option>
            <option value="all">All</option>
          </select>
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-600 cursor-pointer">
              <span className="font-semibold">Select your own dates</span>
            </label>
            <label className="flex items-center space-x-1 cursor-pointer">
              <span className="text-gray-600">Show Calendar</span>
              <input
                type="checkbox"
                ref={checkboxRef}
                className="w-4 h-4 text-blue-500 border rounded cursor-pointer"
                onChange={handleCalendarTicked}
              />
            </label>
          </div>
          {isCalendarTicked && (
            <div className="mt-4 p-4 bg-white rounded border">
              <form action="">
                <label htmlFor="from" className="block text-gray-600 mb-1">
                  From
                </label>
                <input
                  type="date"
                  id="from"
                  ref={inputRefFrom}
                  className="border p-2 w-full"
                />
                <label htmlFor="to" className="block text-gray-600 mt-2 mb-1">
                  To
                </label>
                <input
                  type="date"
                  id="to"
                  ref={inputRefTo}
                  className="border p-2 w-full"
                />
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={getFilteredItemsFromCalendarSelection}
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col max-w-full">
        <p className="text-lg font-semibold mb-2">
          {isCalendarTicked
            ? `Cash flow in your range`
            : selectedOption
            ? wordingForSelectedOption
            : "Total cash flow"}
        </p>
        <div className="flex justify-between">
          <span className="text-xl font-bold text-red-500">
            -${formatNumber(getSpendingAmount())}
          </span>
          <span className="text-xl font-bold text-green-500">
            +${formatNumber(getIncomeAmount())}
          </span>
        </div>

        <div className="flex flex-col gap-3 mt-5">
          {filteredItems?.length === 0 ? (
            <p className="text-gray-600">Zero expenses or income found.</p>
          ) : (
            filteredItems?.map((item) => (
              <ExpenseIncomeItem item={item} key={item.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
