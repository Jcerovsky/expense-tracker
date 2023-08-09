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
      await addData(formData);
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
    "border-2 cursor-pointer rounded-lg text-xl p-2 hover:shadow-inner";

  return (
    <div>
      <ErrorMessage
        errorMessage={context?.errorMessage}
        setErrorMessage={context?.setErrorMessage}
      />
      <form
        action=""
        className="border-8 flex flex-col justify-center  rounded-lg gap-2 p-3 cursor-pointer"
        ref={formRef}
      >
        <label htmlFor="item" className="cursor-pointer">
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
        <label htmlFor="cost">Amount</label>
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
        <label htmlFor="category" className="cursor-pointer"></label>
        <label htmlFor="description" className="cursor-pointer">
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
        <label htmlFor="date" className="cursor-pointer">
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
          className={`${inputStyle} active:scale-90`}
          onClick={(event) => handleSubmit(event)}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
