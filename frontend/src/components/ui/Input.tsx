import type { ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

interface CustomInputProps extends ComponentPropsWithoutRef<"input"> {
  hasError?: boolean;
}

export const CustomInput = ({ 
  className, 
  hasError = false, 
  ...rest 
}: CustomInputProps) => {
  
  return (
    <input
      className={clsx(
        "w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2",
        
        hasError 
          ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900 placeholder-red-300 bg-red-50" 
          : "border-gray-300 focus:ring-[#1C5B9E] focus:border-[#1C5B9E] text-gray-900 placeholder-gray-400 bg-white",
          
        className
      )}
      {...rest}
    />
  );
};