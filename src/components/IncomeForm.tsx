import { useState, MouseEvent, useRef, useContext } from "react";
import { addData, expensesCollectionProps } from "../utils/firebase";
import { UserContext } from "../context/UserContext";
import { ErrorMessage } from "./ErrorMessage";

function ExpenseForm() {
  const context = useContext(UserContext);
  const [formData, setFormData] = useState<expensesCollectionProps>({
    item: "",
    cost: 0,
    category: "Income",
    description: "",
    date: "",
    uid: context?.userId || null,
    createdAt: Date.now(),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();

    if (formData.item.length < 3 || !formData.cost || !formData.date) {
      context?.setErrorMessage(
        "One of the following is not filled properly: Item, Cost, Date",
      );
      return;
    }

    try {
      await addData(formData, context);
      formRef.current?.reset();
      setFormData({
        item: "",
        date: "",
        cost: 0,
        category: "Income",
        description: "",
        id: "",
        uid: context?.userId || null,
      });
    } catch (err) {
      context?.setErrorMessage(err as string);
    }
  };

  const inputStyle =
    "border-2 cursor-pointer rounded-lg text-md p-2 hover:shadow-inner";

  return (
    <div className="p-2 h-screen">
      <ErrorMessage
        errorMessage={context?.errorMessage}
        setErrorMessage={context?.setErrorMessage}
      />
      <form
        action=""
        className=" flex flex-col justify-center rounded-lg gap-2 p-3 cursor-pointer bg-gradient-to-b from-indigo-400 to-teal-500"
        ref={formRef}
      >
        <label htmlFor="item" className="cursor-pointer text-xl">
          Income
        </label>
        <input
          type="text"
          id="item"
          name="item"
          className={inputStyle}
          placeholder="Salary"
          value={formData?.item}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              item: e.target.value,
            }))
          }
        />
        <label htmlFor="cost" className="text-xl">
          Amount
        </label>
        <input
          type="number"
          id="cost"
          name="cost"
          className={inputStyle}
          placeholder="$$$"
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              cost: +e.target.value,
            }))
          }
        />
        <label htmlFor="category" className="cursor-pointer text-xl"></label>
        <label htmlFor="description" className="cursor-pointer text-xl">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Weekly income"
          className={inputStyle}
          value={formData?.description}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
        />
        <label htmlFor="date" className="cursor-pointer text-xl">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          placeholder={formData?.date.toString()}
          className={inputStyle}
          value={formData?.date}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              date: e.target.value,
            }))
          }
        />
        <button
          className={`${inputStyle} active:scale-90 mt-5`}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onClick={(event) => handleSubmit(event)}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
