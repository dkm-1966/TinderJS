import React, { FC, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

export interface IDropDownMenuProps {
    title: string;
    params: string[];
    selector: (value: string) => void;
  }

const Dropdown: FC<IDropDownMenuProps> = ({ title, params, selector }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedParam, setSelectedParam] = useState<string>("");

  const handleSelect = (param: string) => {
    setSelectedParam(param);
    setIsOpen(false);
    selector(param);
  };

  return (
    <div>
      <div
        className="flex items-center justify-between rounded-md p-1 border border-gray-500 w-28 text-gray-400 bg-gray-700 cursor-pointer select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p>{selectedParam ? selectedParam : title}</p>
        <IoIosArrowDown />
      </div>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            className="absolute bg-gray-700 w-28 mt-1 rounded-md border border-gray-500 max-h-40 overflow-y-auto z-50"
            initial={{ x: 0, y: -15 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: 0, y: 0 }}
          >
            {params.map((param) => (
              <p
                key={param}
                className="p-1 hover:bg-gray-600 cursor-pointer text-gray-400 select-none"
                onClick={() => handleSelect(param)}
              >
                {param}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Dropdown;