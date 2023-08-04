import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { calculateDateFromTimeframe } from "../utils/calculateDateFromTimeframe";
import ExpenseIncomeItem from "./ExpenseIncomeItem";
import { expensesCollectionProps } from "../utils/firebase";
import Button from "./Button";
import { data } from "autoprefixer";

function Dashboard() {
  const context = useContext(UserContext);
  const inputRefFrom = useRef<HTMLInputElement>(null);
  const inputRefTo = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const [filteredItems, setFilteredItems] = useState<
    expensesCollectionProps[] | undefined
  >([]);
  const [isCalendarTicked, setIsCalendarTicked] = useState<boolean>(false);

  const getItemsFromButtonSelection = (date: "week" | "month" | "year") => {
    setIsCalendarTicked(false);
    checkboxRef.current!.checked = false;
    return setFilteredItems(
      context?.filteredByUser.filter(
        (item) => item.date > calculateDateFromTimeframe(date),
      ),
    );
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
    console.log("fitered", filteredItems);
  };

  return (
    <div>
      <div>
        <div>
          <Button
            color={"green"}
            handleClick={() => getItemsFromButtonSelection("week")}
          >
            Last week
          </Button>
          <Button
            color={"seaGreen"}
            handleClick={() => getItemsFromButtonSelection("month")}
          >
            Last mont
          </Button>
          <Button
            color={"limeGreen"}
            handleClick={() => getItemsFromButtonSelection("year")}
          >
            Last year
          </Button>
        </div>
        <div>
          <p>Select your own dates</p>
          <input
            type="checkbox"
            ref={checkboxRef}
            onChange={() => setIsCalendarTicked((prevState) => !prevState)}
          />
          {isCalendarTicked && (
            <div>
              <form action="" className="m-2 rounded-sm flex flex-col border-2">
                <label>From</label>
                <input
                  type="date"
                  ref={inputRefFrom}
                  className="border-2 p-2"
                />
                <label>To</label>
                <input type="date" ref={inputRefTo} className="border-2 p-2" />
                <button
                  className="block border-2 p-2"
                  onClick={getFilteredItems}
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div>
        <p>${filteredItems!.reduce((a, b) => a + b.cost, 0)}</p>

        {filteredItems!.length === 0
          ? "Zero expenses or income found."
          : filteredItems!.map((item) => <ExpenseIncomeItem item={item} />)}
      </div>
    </div>
  );
}

export default Dashboard;
