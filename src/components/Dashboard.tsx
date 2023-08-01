import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { calculateDateFromTimeframe } from "../utils/calculateDateFromTimeframe";

function Dashboard() {
  const context = useContext(UserContext);

  console.log(
    "date",
    context?.filteredByUser.filter(
      (item) => item.date < calculateDateFromTimeframe("week"),
    ),
  );

  return <div>{context?.filteredByUser.reduce((a, b) => a + b.cost, 0)}</div>;
}

export default Dashboard;
