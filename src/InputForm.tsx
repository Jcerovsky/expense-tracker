import InputCategory from "./InputCategory";

function InputForm() {
  const categories = [
    "Select",
    "Groceries",
    "Shopping",
    "Eating Out",
    "Entertainment",
    "Health",
    "Health",
    "Transport",
    "Home",
    "Travel",
    "Education",
    "Other",
  ];

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
          className="border-2 p-2 cursor-pointer rounded-lg	"
        />
        <label htmlFor="cost">How much was it</label>
        <input
          type="number"
          id="cost"
          name="cost"
          className="border-2 p-2 cursor-pointer rounded-lg	"
        />
        <label htmlFor="category" className="cursor-pointer">
          Category
        </label>
        <select
          name="category"
          id="category"
          className="p-2 border-2 cursor-pointer"
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
          className="p-2 border-2 cursor-pointer rounded-lg	"
        />
        <label htmlFor="date" className="cursor-pointer">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="border-2 p-2 cursor-pointer rounded-lg	"
        />
        <button className="border-2 cursor-pointer rounded-lg text-2xl">
          Add expense
        </button>
      </form>
    </div>
  );
}

export default InputForm;
