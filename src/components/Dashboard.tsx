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
    setFilteredItems(context?.filteredByUser);
    setOriginalItems(context?.filteredByUser);
  }, []);

  useEffect(() => {
    context?.fetchData();
  }, []);

  const getItemsFromButtonSelection = useCallback(
    (date: "week" | "month" | "year" | "future" | "today") => {
      setIsCalendarTicked(false);
      checkboxRef.current!.checked = false;

      setFilteredItems(
        context?.filteredByUser?.filter(
          (item) => item.date >= calculateDateFromTimeframe(date),
        ),
      );
    },
    [context?.filteredByUser],
  );

  const getIncomeOrExpenses = (category: "Income" | "Expenses") => {
    if (category === "Income") {
      setFilteredItems(
        originalItems?.filter((item) => item.category === "Income"),
      );
    } else if (category === "Expenses") {
      setFilteredItems(
        originalItems?.filter((item) => item.category !== "Income"),
      );
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
      : `Total cash flow in the last ${selectedOption}`;

  return (
    <div className="bg-gray-100 p-5">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4 mb-5">
        <div className="flex flex-wrap justify-between">
          <button
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setFilteredItems(originalItems)}
          >
            See all
          </button>
          <button
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => {
              getIncomeOrExpenses("Income");
            }}
          >
            Income
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => {
              getIncomeOrExpenses("Expenses");
            }}
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
                  | "today",
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

      <div>
        <p className="text-lg font-semibold mb-2">
          {isCalendarTicked
            ? "Total cash flow in your specified range"
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
