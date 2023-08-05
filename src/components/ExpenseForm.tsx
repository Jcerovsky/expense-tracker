import InputCategory from "./InputCategory";
import { useState, MouseEvent, useRef, useContext } from "react";
import { addData, expensesCollectionProps } from "../utils/firebase";
import { UserContext } from "../context/UserContext";
import { ErrorMessage } from "./ErrorMessage";

function ExpenseForm() {
  const context = useContext(UserContext);
  const [formData, setFormData] = useState<expensesCollectionProps>({
    item: "",
    cost: 0,
    category: "",
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

    if (formData.item.length < 3) {
      context?.setErrorMessage("Item needs to be longer");
      console.log("too short");
      return;
    } else if (formData.item.includes(Number))
      try {
        await addData(formData);
        formRef.current?.reset();
        setFormData({
          item: "",
          date: "",
          cost: 0,
          category: "",
          description: "",
          id: "",
          uid: context?.userId || null,
        });
      } catch (err) {
        context?.setErrorMessage(err as string);
      }
  };

  const categories = [
    "Select",
    "Groceries",
    "Shopping",
    "Eating Out",
    "Entertainment",
    "Health",
    "Home",
    "Travel",
    "Education",
    "Other",
  ];

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
          Item
        </label>
        <input
          type="text"
          id="item"
          name="item"
          className={inputStyle}
          placeholder="Groceries"
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
        <label htmlFor="category" className="cursor-pointer">
          Category
        </label>
        <select
          name="category"
          id="category"
          className={inputStyle}
          required={true}
          value={formData?.category}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              category: e.target.value,
            }))
          }
        >
          {categories.map((category) => (
            <InputCategory key={crypto.randomUUID()} category={category} />
          ))}
        </select>
        <label htmlFor="description" className="cursor-pointer">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Weekly grocery shopping"
          required={true}
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
          required={true}
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
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
