import { ReactNode } from "react";
import "./style.css";

type ButtonProps = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  dataTestId?: string;
};

const Button = ({
  children,
  onClick,
  className = "button__default",
  dataTestId,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} data-testid={dataTestId}>
      {children}
    </button>
  );
};

export default Button;
