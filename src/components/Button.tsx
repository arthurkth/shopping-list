import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const Button = ({
  children,
  onClick,
  className = "button__default",
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
