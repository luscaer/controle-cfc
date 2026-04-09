import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { clsx } from "clsx";

interface CustomButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withLogoCheck?: boolean;
  children: ReactNode;
}

export const CustomButton = ({ 
  className, 
  variant = 'primary', 
  size = 'md',       
  withLogoCheck = false,
  children,
  ...rest 
}: CustomButtonProps) => {

  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none cursor-pointer";

  const variants = {
    primary: "bg-[#1C5B9E] text-white hover:bg-[#15467A] focus-visible:ring-[#1C5B9E]", 
    secondary: "bg-transparent text-[#1C5B9E] border border-[#1C5B9E] hover:bg-blue-50 focus-visible:ring-[#1C5B9E]", 
    ghost: "bg-transparent text-[#1C5B9E] hover:bg-blue-50 focus-visible:ring-blue-200"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base"
  };

  return (
    <button
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      {...rest}
    >
      {withLogoCheck && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 7.5L9.5 8.5" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M10 9L11 10" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      )}
      {children}
    </button>
  );
};