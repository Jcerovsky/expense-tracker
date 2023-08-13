import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { calculateDateFromTimeframe } from "../utils/calculateDateFromTimeframe";
import ExpenseIncomeItem from "./ExpenseIncomeItem";
import { expensesCollectionProps } from "../utils/firebase";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";

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
  }, [context?.filteredByUser]);

  const getItemsFromButtonSelection = (date: "week" | "month" | "year") => {
    setIsCalendarTicked(false);
    checkboxRef.current!.checked = false;
    setFilteredItems(
      originalItems?.filter(
        (item) => item.date > calculateDateFromTimeframe(date),
      ),
    );
  };

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
    return filteredItems!
      .filter((item) => item.category !== "Income")
      .reduce((a, b) => a + b.cost, 0);
  };

  const getIncomeAmount = () => {
    return filteredItems!
      .filter((item) => item.category === "Income")
      .reduce((a, b) => a + b.cost, 0);
  };

  const getFilteredItems = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setFilteredItems(
      context?.filteredByUser
        .filter((item) => inputRefFrom.current!.value <= item.date)
        .filter((item) => inputRefTo.current!.value >= item.date),
    );
    setOriginalItems(
      context?.filteredByUser
        .filter((item) => inputRefFrom.current!.value <= item.date)
        .filter((item) => inputRefTo.current!.value >= item.date),
    );
  };

  return (
    <div className="bg-gray-100 p-5">
      <div className="flex flex-wrap mb-4 space-x-2">
        <button onClick={() => setFilteredItems(originalItems)}>See all</button>
        <button
          onClick={() => {
            getIncomeOrExpenses("Income");
          }}
        >
          See income
        </button>
        <button
          onClick={() => {
            getIncomeOrExpenses("Expenses");
          }}
        >
          See expenses
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="timeframe" className="block text-gray-700 mb-1">
          See movement for
        </label>
        <select
          id="timeframe"
          className="border rounded p-2 w-full"
          onChange={(e) => {
            getItemsFromButtonSelection(
              e.target.value as "week" | "month" | "year",
            );
            setSelectedOption(e.target.value);
          }}
        >
          <option value="">Select</option>
          <option value="week">Last week</option>
          <option value="month">Last month</option>
          <option value="year">Last year</option>
        </select>
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <label className="text-gray-700 cursor-pointer">
            <span className="font-semibold">Select your own dates</span>
          </label>
          <label className="flex items-center space-x-1 cursor-pointer">
            <span className="text-gray-600">Show Calendar</span>
            <input
              type="checkbox"
              ref={checkboxRef}
              className="w-4 h-4 text-blue-500 border rounded cursor-pointer"
              onChange={() => setIsCalendarTicked((prevState) => !prevState)}
            />
          </label>
        </div>

        {isCalendarTicked && (
          <div className="mt-4 p-4 bg-white rounded border">
            <form action="">
              <label htmlFor="from" className="block text-gray-700 mb-1">
                From
              </label>
              <input
                type="date"
                id="from"
                ref={inputRefFrom}
                className="border p-2 w-full"
              />
              <label htmlFor="to" className="block text-gray-700 mt-2 mb-1">
                To
              </label>
              <input
                type="date"
                id="to"
                ref={inputRefTo}
                className="border p-2 w-full"
              />
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={getFilteredItems}
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
      <div>
        <p className="text-lg font-semibold mb-2">
          {isCalendarTicked
            ? "Total cash flow in your specified range"
            : selectedOption
            ? `Total cash flow in the last ${selectedOption}`
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
          {filteredItems!.length === 0 ? (
            <p className="text-gray-600">Zero expenses or income found.</p>
          ) : (
            filteredItems!.map((item) => (
              <ExpenseIncomeItem item={item} key={crypto.randomUUID()} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
