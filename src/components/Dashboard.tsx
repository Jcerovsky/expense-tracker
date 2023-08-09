import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { calculateDateFromTimeframe } from "../utils/calculateDateFromTimeframe";
import ExpenseIncomeItem from "./ExpenseIncomeItem";
import { expensesCollectionProps } from "../utils/firebase";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";
import Button from "./Button";

function Dashboard() {
  const context = useContext(UserContext);
  const inputRefFrom = useRef<HTMLInputElement>(null);
  const inputRefTo = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const [filteredItems, setFilteredItems] = useState<
    expensesCollectionProps[] | undefined
  >(context?.filteredByUser);
  const [isCalendarTicked, setIsCalendarTicked] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const getItemsFromButtonSelection = (date: "week" | "month" | "year") => {
    setIsCalendarTicked(false);
    checkboxRef.current!.checked = false;
    return setFilteredItems(
      context?.filteredByUser.filter(
        (item) => item.date > calculateDateFromTimeframe(date),
      ),
    );
  };

  const getAllItems = () => {
    setFilteredItems(context?.filteredByUser);
  };

  const getExpenses = () => {
    return filteredItems?.filter((item) => item.category !== "Income");
  };

  const getIncome = () => {
    return filteredItems?.filter((item) => item.category === "Income");
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
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="flex flex-wrap mb-4 space-x-2">
        <Button handleClick={() => getAllItems()}>See all</Button>
        <Button
          handleClick={() => {
            getAllItems();
            setFilteredItems(getIncome());
          }}
        >
          See income
        </Button>
        <Button handleClick={() => setFilteredItems(getExpenses())}>
          See expenses
        </Button>
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
        <div className="flex items-center space-x-2">
          <p className="text-gray-700">Select your own dates</p>
          <input
            type="checkbox"
            ref={checkboxRef}
            className="p-2"
            onChange={() => setIsCalendarTicked((prevState) => !prevState)}
          />
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
