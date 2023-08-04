import { expensesCategories } from "../utils/categories";
import { getDate, getYesterdayDate } from "../utils/getDate";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";
import { deleteData, expensesCollectionProps } from "../utils/firebase";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  item: expensesCollectionProps;
}

function ExpenseIncomeItem({ item }: Props) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const context = useContext(UserContext);
  const handleDelete = async (id: string) => {
    await deleteData(id);
    context?.fetchData();
  };

  return (
    <>
      <div
        className="container flex gap-2 border-2 bg-gray-200 rounded-xl items-center justify-left p-2 relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span className="text-3xl bg-purple-700 text-white p-2 rounded-xl">
          {
            expensesCategories[
              item.category.toLowerCase() as keyof typeof expensesCategories
            ]
          }
        </span>
        <div className="flex flex-col justify-center items-left ml-2">
          <p className="text-xl mt-2 justify-self-center">{item.item}</p>
          <p className="opacity-50 text-xs text-ellipsis max-w-xs">
            {item.description}
          </p>
        </div>
        <p
          className="absolute text-xs top-0 left-0 bg-yellow-300 rounded-xl pl-1 pr-1  "
          style={{ top: "-0.7rem" }}
        >
          {item.date === getDate()
            ? "Today"
            : item.date === getYesterdayDate()
            ? "Yesterday"
            : item.date}
        </p>
        <p
          className="text-xl bold ml-auto"
          style={
            item.category !== "income" ? { color: "red" } : { color: "green" }
          }
        >
          ${formatNumber(item.cost)}
        </p>

        {isHovering && (
          <RiDeleteBin6Line
            className=" absolute top-0 right-0 text-l text-red-600 "
            onClick={() => handleDelete(item.id!)}
          />
        )}
      </div>
    </>
  );
}

export default ExpenseIncomeItem;
