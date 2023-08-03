import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { calculateDateFromTimeframe } from "../utils/calculateDateFromTimeframe";
import ExpenseIncomeItem from "./ExpenseIncomeItem";
import { expensesCollectionProps } from "../utils/firebase";

function Dashboard() {
  const context = useContext(UserContext);
  const inputRefFrom = useRef<HTMLInputElement>(null);
  const inputRefTo = useRef<HTMLInputElement>(null);

  const filteredByDateInput = context?.filteredByUser.filter(
    (item) => item.date > calculateDateFromTimeframe("week"),
  );
  const [filteredItems, setFilteredItems] = useState<
    expensesCollectionProps[] | undefined
  >([]);

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
        <form action="" className="m-2 rounded-sm flex flex-col border-2">
          <label>From</label>
          <input type="date" ref={inputRefFrom} className="border-2 p-2" />
          <label>To</label>
          <input type="date" ref={inputRefTo} className="border-2 p-2" />
          <button className="block border-2 p-2" onClick={getFilteredItems}>
            Search
          </button>
        </form>
      </div>
      <div>
        <p>Total spending from </p>
        <p>${filteredItems!.reduce((a, b) => a + b.cost, 0)}</p>

        {filteredByDateInput!.length === 0
          ? "Zero expenses or income found."
          : filteredItems!.map((item) => <ExpenseIncomeItem item={item} />)}
      </div>
    </div>
  );
}

export default Dashboard;
