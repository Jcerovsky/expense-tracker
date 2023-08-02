import { useContext, useRef } from "react";
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

  const update = () => {
    const items = context?.filteredByUser.filter(
      (item) =>
        item.date >= inputRefFrom.current?.value &&
        item.date <= inputRefTo.current?.value,
    );
    return items;
  };

  return (
    <div>
      <div className="m-2 rounded-sm flex flex-col">
        <label>From</label>
        <input type="date" ref={inputRefFrom} className="border-2 p-2" />
        <label>To</label>
        <input
          type="date"
          ref={inputRefTo}
          onChange={() => update()}
          className="border-2 p-2"
        />
      </div>
      <div>
        <p>Total spending from </p>
        <p>${filteredByDateInput!.reduce((a, b) => a + b.cost, 0)}</p>

        {filteredByDateInput!.length === 0
          ? "Zero expenses or income found."
          : update()!.map((item) => <ExpenseIncomeItem item={item} />)}
      </div>
    </div>
  );
}

export default Dashboard;
