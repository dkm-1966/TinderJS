import { FC } from "react";

interface ButtonProps {
  children: string;
  callback: () => void;
}

const Button: FC<ButtonProps> = ({ children, callback }) => {
  return (
    <button
      className="bg-lime-300 text-lime-700 font-bold py-2 px-4 rounded hover:bg-lime-200 transition duration-300 ease-in-out cursor-pointer w-full"
      onClick={callback}
    >
      {children}
    </button>
  );
};

export default Button;
