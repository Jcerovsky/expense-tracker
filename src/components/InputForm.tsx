import InputCategory from "./InputCategory";
import { useState, MouseEvent } from "react";

function InputForm() {
  interface FormProps {
    item: string;
    cost: number;
    category: string;
    description?: string;
    date: string;
  }

  const [formData, setFormData] = useState<FormProps>({
    item: "",
    cost: 0,
    category: "",
    description: "",
    date: new Date().toISOString(),
  });

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    console.log(formData);
  };

  const categories = [
    "Select",
    "Groceries",
    "Shopping",
    "Eating Out",
    "Entertainment",
    "Health",
    "Transport",
    "Home",
    "Travel",
    "Education",
    "Other",
  ];

  const inputStyle =
    "border-2 cursor-pointer rounded-lg text-xl p-2 hover:shadow-inner";

  return (
    <div>
      <form
        action=""
        className="border-8 flex flex-col justify-center  rounded-lg gap-2 p-3 cursor-pointer"
      >
        <label htmlFor="item" className="cursor-pointer">
          What did you buy?
        </label>
        <input
          type="text"
          id="item"
          name="item"
          className={inputStyle}
          placeholder=""
          value={formData?.item}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              item: e.target.value,
            }))
          }
        />
        <label htmlFor="cost">How much was it? </label>
        <input
          type="number"
          id="cost"
          name="cost"
          className={inputStyle}
          placeholder="$"
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
          Add expense
        </button>
      </form>
    </div>
  );
}

export default InputForm;
