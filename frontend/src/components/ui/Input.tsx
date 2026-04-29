import React, {
  forwardRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { clsx } from "clsx";
import { Eye, EyeOff } from "lucide-react";

interface CustomInputProps extends ComponentPropsWithoutRef<"input"> {
  hasError?: boolean;
  iconLeft?: React.ReactNode;
  showToggle?: boolean;
}

export const CustomInput = forwardRef(function CustomInput(
  {
    className,
    hasError = false,
    iconLeft = undefined,
    showToggle = false,
    ...rest
  }: CustomInputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const tipoReal = showToggle && mostrarSenha ? "text" : rest.type;

  return (
    <div className={clsx("relative flex items-center", className)}>
      {iconLeft && (
        <div className="absolute left-3 text-gray-400">{iconLeft}</div>
      )}
      <input
        ref={ref}
        className={clsx(
          "w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2",
          iconLeft && "pl-10",
          showToggle && "pr-10",

          hasError
            ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900 placeholder-red-300 bg-red-50"
            : "border-gray-300 focus:ring-[#1C5B9E] focus:border-[#1C5B9E] text-gray-900 placeholder-gray-400 bg-white",
        )}
        {...rest}
        type={tipoReal}
      />
      {showToggle && (
        <PasswordToggle
          mostrarSenha={mostrarSenha}
          onToggle={() => setMostrarSenha((s) => !s)}
        />
      )}
    </div>
  );
});

interface PasswordToggleProps {
  mostrarSenha: boolean;
  onToggle: () => void;
}

function PasswordToggle({
  mostrarSenha,
  onToggle: setMostrarSenha,
}: PasswordToggleProps) {
  return (
    <button
      type="button"
      onClick={setMostrarSenha}
      className="absolute right-3 text-gray-400 hover:text-gray-600"
      aria-label={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
    >
      {mostrarSenha ? (
        <EyeOff className="h-5 w-5"></EyeOff>
      ) : (
        <Eye className="h-5 w-5"></Eye>
      )}
    </button>
  );
}
