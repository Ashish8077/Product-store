import React, { forwardRef } from "react";

const CustomBtn = (
  {
    children,
    type = "button",
    bgColor = "bg-[#292B34]",
    textColor = "text-white",
    className = "",
    ...props
  },
  ref
) => {
  return (
    <button
      ref={ref}
      type={type}
      className={`p-2 rounded-md ${bgColor} ${textColor} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default forwardRef(CustomBtn);
