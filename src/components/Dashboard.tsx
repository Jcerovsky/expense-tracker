import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { calculateDateFromTimeframe } from "../utils/calculateDateFromTimeframe";
import ExpenseIncomeItem from "./ExpenseIncomeItem";

function Dashboard() {
  const context = useContext(UserContext);
  const inputRefFrom = useRef<HTMLInputElement>(null);
  const inputRefTo = useRef<HTMLInputElement>(null);

  const filteredByDateInput = context?.filteredByUser.filter(
    (item) => item.date > calculateDateFromTimeframe("week"),
  );

  const filteredByCustomUserInput = context?.filteredByUser.filter(
    (item) =>
      item.date >= inputRefFrom.current?.value &&
      item.date <= inputRefTo.current?.value,
  );

  return (
    <div>
      <div>
        <p>Display expenses and income</p>
        <label htmlFor="">From</label>
        <input type="date" ref={inputRefFrom} />
        <label htmlFor="">To</label>
        <input type="date" ref={inputRefTo} />
      </div>
      <div>
        <p>Total spending from </p>
        <p
          onClick={() => {
            console.log("clicked");
            console.log(filteredByCustomUserInput);
          }}
        >
          ${filteredByDateInput!.reduce((a, b) => a + b.cost, 0)}
        </p>

        {filteredByCustomUserInput!.length === 0
          ? "Zero expenses or income found."
          : filteredByDateInput!.map((item) => (
              <ExpenseIncomeItem item={item} />
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
