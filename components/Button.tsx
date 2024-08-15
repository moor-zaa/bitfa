import React from "react";

interface ButtonProps {
  className?: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({
  className,
  label,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} px-8 rounded-md py-1 cursor-pointer bg-[#384655] my-8 hover:bg-[#5e758d] disabled:bg-[#869cb4]`}
    >
      {label}
    </button>
  );
};

export default Button;
