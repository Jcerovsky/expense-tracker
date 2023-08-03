import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  const handleClick = (destination: string) => {
    navigate(destination);
    console.log("redirecting to", destination);
  };

  return (
    <div className="flex p-3  justify-center items-center h-screen">
      <Button
        color={"green"}
        handleClick={() => handleClick("/form/add-income")}
      >
        Add Income
      </Button>
      <Button
        color={"red"}
        handleClick={() => handleClick("/form/add-expense")}
      >
        Add Expenses
      </Button>
    </div>
  );
}

export default Form;
