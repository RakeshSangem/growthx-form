import React from "react";

interface CustomCheckBoxProps {
  option: {
    id: string;
    value: string;
  };
  shortcut?: string;
  onClick: (optionId: string) => void; // Change the type of onClick parameter
  selectedOptions: string[];
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  option,
  onClick,
  shortcut,
  selectedOptions,
}) => {
  const isChecked = selectedOptions.includes(option.id); // Use option.id to check if it's selected

  const handleClick = () => {
    onClick(option.id); // Pass option.id to the onClick function
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={selectedOptions.length >= 2 && !isChecked}
      className={`flex items-center w-full bg-[#1A1A1A] py-1.5 border border-white/60 rounded-md cursor-pointer text-xl px-2 transition duration-300 hover:bg-zinc-700 ${selectedOptions.length >= 2 && !isChecked ? "opacity-50 cursor-not-allowed pointer-events-none border-white/20" : ""}`}
    >
      <span
        className={`border border-white/60 text-xs w-6 h-6 font-bold grid rounded-sm place-items-center mr-3 ${isChecked ? "bg-white text-black" : "bg-black"}`}
      >
        {shortcut}
      </span>
      <span className="text-xl mr-4">{option?.value}</span>
      <span className={`${isChecked ? "visible" : "invisible"}  ml-auto mx-1`}>
        <svg width="16" height="13">
          <path
            d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
            fill="white"
          ></path>
        </svg>
      </span>
    </button>
  );
};

export default CustomCheckBox;
