import { FC, ReactNode } from "react";

interface Props {
  color: string;
  selectedRange: "Income" | "Expenses" | "all";
  children: ReactNode;
  handleClick: (category: "Income" | "Expenses" | "all") => void;
}

const Button: FC<Props> = ({ color, selectedRange, children, handleClick }) => {
  return (
    <button
      className={`bg-gradient-to-r from-${color}-400 to-${color}-600 text-white px-4 py-2 rounded-lg hover:bg-${color}-800`}
      onClick={() => {
        handleClick(selectedRange);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
