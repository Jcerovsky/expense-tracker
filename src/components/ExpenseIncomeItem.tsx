import { expensesCategories } from "../utils/categories";
import { getDate, getYesterdayDate } from "../utils/getDate";
import { formatNumber } from "../utils/formatNumberToIncludeDecimalPlaces";
import { deleteData, expensesCollectionProps } from "../utils/firebase";

interface Props {
  item: expensesCollectionProps;
  fetchData: () => void;
}

function ExpenseIncomeItem({ item, fetchData }: Props) {
  const handleDelete = async (id: string) => {
    await deleteData(id);
    fetchData();
  };

  return (
    <>
      <div className="flex gap-2 border-2 bg-gray-200 rounded-md items-center justify-left p-2 relative wrap">
        <span className="text-2xl bg-purple-700 text-white p-2 rounded-xl">
          {
            expensesCategories[
              item.category.toLowerCase() as keyof typeof expensesCategories
            ]
          }
        </span>
        <div className="flex flex-col justify-c ml-4 mt-2">
          <p className="text-xl">{item.item}</p>
          <p>{item.description}</p>
        </div>
        <p className="absolute top-0 left-0.5 text-xs">
          {item.date === getDate()
            ? "Today"
            : item.date === getYesterdayDate()
            ? "Yesterday"
            : item.date}
        </p>
        <p className="text-xl bold ml-auto">${formatNumber(item.cost)}</p>
        <div
          className="flex justify-center items-center absolute top-0.5 right-0.5 p-3 text-sm bg-red-300 w-5 h-5 rounded-full"
          onClick={() => handleDelete(item.id!)}
        >
          <p className="">X</p>
        </div>
      </div>
    </>
  );
}

export default ExpenseIncomeItem;
