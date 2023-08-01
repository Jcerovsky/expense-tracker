import { expensesCategories } from "../utils/categories";
import { getDate, getYesterdayDate } from "../utils/getDate";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";
import { deleteData, expensesCollectionProps } from "../utils/firebase";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  item: expensesCollectionProps;
}

function ExpenseIncomeItem({ item }: Props) {
  const context = useContext(UserContext);
  const handleDelete = async (id: string) => {
    await deleteData(id);
    context?.fetchData();
  };

  return (
    <>
      <div className="flex gap-2 border-2 bg-gray-200 rounded-md items-center justify-left p-2 relative">
        <span className="text-2xl bg-purple-700 text-white p-2 rounded-xl">
          {
            expensesCategories[
              item.category.toLowerCase() as keyof typeof expensesCategories
            ]
          }
        </span>
        <div className="flex flex-col justify-center items-left ml-2 ">
          <p className="text-xl mt-2">{item.item.to}</p>
          <p>{item.description}</p>
        </div>
        <p className="absolute top-0 left-0.5 text-xs ">
          {item.date === getDate()
            ? "Today"
            : item.date === getYesterdayDate()
            ? "Yesterday"
            : item.date}
        </p>
        <p className="text-xl bold ml-auto">${formatNumber(item.cost)}</p>
        <RiDeleteBin6Line
          className=" absolute top-0 right-0 text-l text-red-600"
          onClick={() => handleDelete(item.id!)}
        />
      </div>
    </>
  );
}

export default ExpenseIncomeItem;
