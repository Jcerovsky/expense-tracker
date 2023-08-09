import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center h-screen items-center gap-4 bg-green-100">
      <Button color="red" handleClick={() => navigate("add-expense")}>
        Add Expense
      </Button>
      <Button color="green" handleClick={() => navigate("add-income")}>
        Add Income
      </Button>
    </div>
  );
}

export default Form;
