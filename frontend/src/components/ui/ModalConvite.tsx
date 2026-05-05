import { Mail, Info, Send } from "lucide-react";
import { Modal } from "./Modal";
import { CustomInput } from "./Input";
import { Spinner } from "./Spinner";
import type { ConviteFormData } from "../../schemas/conviteSchema";
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface ModalConviteProps {
  isOpen: boolean;
  onClose: () => void;
  register: UseFormRegister<{ email: string }>;
  handleSubmit: UseFormHandleSubmit<{ email: string }>;
  onSubmit: (data: ConviteFormData) => Promise<void>;
  errors: FieldErrors<{ email: string }>;
  isSubmitting: boolean;
}

export function ModalConvite({ isOpen, onClose, register, handleSubmit, onSubmit, errors, isSubmitting }: ModalConviteProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Mail size={14} className="text-blue-800" />}
      title="Convidar autoescola"
      description="Um e-mail será enviado com instruções para criar a conta."
      onSubmit={handleSubmit(onSubmit)}
      actions={[
        {
          label: "Cancelar",
          type: "button",
          variant: "secondary",
          onClick: onClose,
          className: "border-gray-200 px-4 text-xs font-medium text-gray-500 transition hover:bg-gray-50",
        },
        {
          label: isSubmitting ? (
            <><Spinner size={12} /> Enviando...</>
          ) : (
            <><Send size={12} /> Enviar convite</>
          ),
          type: "submit",
          variant: "primary",
          disabled: isSubmitting,
          className: "flex h-[34px] items-center gap-1.5 rounded-lg px-4 text-xs font-medium text-white transition hover:bg-[#185490] disabled:opacity-60",
        },
      ]}
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
          E-mail do responsável
        </label>
        <CustomInput
          iconLeft={<Mail className="h-4 w-4 text-gray-400" />}
          type="email"
          {...register("email")}
          placeholder="contato@autoescola.com.br"
          className="w-full"
        />
        {errors.email ? (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        ) : (
          <p className="flex items-center gap-1 text-[11px] text-gray-400">
            <Info size={11} />
            O link expira em 24 horas após o envio.
          </p>
        )}
      </div>
    </Modal>
  );
}