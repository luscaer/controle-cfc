import type { ReactNode } from "react";
import { CustomButton } from "./Button";

interface ModalAction {
  label: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ModalAction[];
  onSubmit?: (e: React.FormEvent) => void;
}

export function Modal({
  isOpen,
  onClose,
  icon,
  title,
  description,
  children,
  actions,
  onSubmit,
}: ModalProps) {
  if (!isOpen) return null;

  const Wrapper = onSubmit ? "form" : "div";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="relative border-b border-gray-100 px-5 py-4">
          <CustomButton
            variant="ghost"
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </CustomButton>

          <div className="flex items-center gap-2.5">
            {icon && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                {icon}
              </div>
            )}
            <p
              className={`text-sm font-medium text-gray-900 ${!icon ? "ml-0" : ""}`}
            >
              {title}
            </p>
          </div>
          {description && (
            <p
              className={`mt-1 text-xs leading-relaxed text-gray-500 ${icon ? "ml-[38px]" : ""}`}
            >
              {description}
            </p>
          )}
        </div>

        {/* Conteúdo */}
        <Wrapper {...(onSubmit ? { onSubmit } : {})} className="p-5">
          {children && <div className="mb-5">{children}</div>}

          {/* Ações */}
          {actions && actions.length > 0 && (
            <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
              {actions.map((action, index) => (
                <CustomButton
                  key={index}
                  type={action.type ?? "button"}
                  variant={action.variant ?? "secondary"}
                  disabled={action.disabled}
                  onClick={action.onClick}
                  className={action.className}
                >
                  {action.label}
                </CustomButton>
              ))}
            </div>
          )}
        </Wrapper>
      </div>
    </div>
  );
}
