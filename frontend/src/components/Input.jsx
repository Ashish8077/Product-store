import React, { useId } from "react";


const Input = (
  { label, type = "text", className = "", ...props },
  ref
) => {
  const id = useId()
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`px-4 py-2 w-full border mb-4 border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ${className}`}
        {...props}
      />
    </div>
  );
};

export default React.forwardRef(Input);
