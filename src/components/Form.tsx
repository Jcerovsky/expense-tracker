import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  return (
    <div>
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
