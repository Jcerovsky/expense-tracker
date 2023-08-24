import { ReactNode } from "react";

interface Props {
  color: string;
  selectedRange: "Income" | "Expenses" | "all";
  children: ReactNode;
  handleClick: (category: "Income" | "Expenses" | "all") => void;
}

function Button({ color, selectedRange, children, handleClick }: Props) {
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
}

export default Button;
