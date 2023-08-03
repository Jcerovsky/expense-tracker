import { ReactNode } from "react";
import * as React from "react";

interface Props {
  color?: string;
  children: ReactNode;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, color, handleClick }: Props) {
  const styles = {
    backgroundColor: color,
  };

  return (
    <button
      className="border-2 rounded-2xl p-3 hover:shadow-inner hover:scale-105"
      style={styles}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
