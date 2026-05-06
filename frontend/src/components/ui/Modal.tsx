import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomButton } from "./Button";
import { SPRING_MODAL, TRANSITION_FADE } from "../../styles/animation";

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
  onSubmit?: (e: React.SubmitEvent) => void;
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
  const Wrapper = onSubmit ? "form" : "div";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (event: globalThis.KeyboardEvent) => {
        if (event.key === "Escape") onClose();
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION_FADE}

          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white"

            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={SPRING_MODAL}

            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-tittle"
            aria-describedby="modal-description"

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
                  id="modal-title"
                  className={`text-sm font-medium text-gray-900 ${!icon ? "ml-0" : ""}`}
                >
                  {title}
                </p>
              </div>
              {description && (
                <p
                  id="modal-description"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
