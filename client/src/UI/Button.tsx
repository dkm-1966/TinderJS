import { FC } from "react";

interface ButtonProps {
  children: string;
  callback: () => void;
}

const Button: FC<ButtonProps> = ({ children, callback }) => {
  return (
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer w-40"
      onClick={callback}
    >
      {children}
    </button>
  );
};

export default Button;
