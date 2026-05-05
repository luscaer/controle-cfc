import { Mail, Info, Send, CheckCircle2, Lock } from "lucide-react";
import { Modal } from "./Modal";
import { CustomInput } from "./Input";
import { Spinner } from "./Spinner";
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import type { AlterarEmailFormData } from "../../schemas/segurancaSchema";

interface ModalAlteracaoEmailProps {
  isOpen: boolean;
  onClose: () => void;
  register: UseFormRegister<AlterarEmailFormData>;
  handleSubmit: UseFormHandleSubmit<AlterarEmailFormData>;
  onSubmit: (dados: AlterarEmailFormData) => Promise<void>;
  errors: FieldErrors<AlterarEmailFormData>;
  isSubmitting: boolean;
}

export function ModalAlteracaoEmail({
  isOpen,
  onClose,
  register,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
}: ModalAlteracaoEmailProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Mail size={14} className="text-blue-800" />}
      title="Alterar E-mail"
      description="Confirme seu novo e-mail e sua senha atual para prosseguir."
      onSubmit={handleSubmit(onSubmit)}
      actions={[
        {
          label: "Cancelar",
          type: "button",
          variant: "secondary",
          onClick: onClose,
          className:
            "border-gray-200 px-4 text-xs font-medium text-gray-500 transition hover:bg-gray-50",
        },
        {
          label: isSubmitting ? (
            <>
              <Spinner size={12} /> Enviando...
            </>
          ) : (
            <>
              <Send size={12} /> Enviar
            </>
          ),
          type: "submit",
          variant: "primary",
          disabled: isSubmitting,
          className:
            "flex h-[34px] items-center gap-1.5 rounded-lg px-4 text-xs font-medium text-white transition hover:bg-[#185490] disabled:opacity-60",
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        {/* Campo: Novo E-mail */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
            Novo E-mail
          </label>
          <CustomInput
            iconLeft={<Mail className="h-4 w-4 text-gray-400" />}
            type="email"
            {...register("novoEmail")}
            placeholder="novo.email@exemplo.com"
            className="w-full"
            hasError={!!errors.novoEmail}
          />
          {errors.novoEmail && (
            <p className="text-xs text-red-500">{errors.novoEmail.message}</p>
          )}
        </div>

        {/* Campo: Confirmação de E-mail */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
            Confirmar Novo E-mail
          </label>
          <CustomInput
            iconLeft={<CheckCircle2 className="h-4 w-4 text-gray-400" />}
            type="email"
            {...register("confirmacaoEmail")}
            placeholder="Repita o novo e-mail"
            className="w-full"
            hasError={!!errors.confirmacaoEmail}
          />
          {errors.confirmacaoEmail && (
            <p className="text-xs text-red-500">
              {errors.confirmacaoEmail.message}
            </p>
          )}
        </div>

        <hr className="border-gray-100" />

        {/* Campo: Senha Atual (Necessário para segurança) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
            Sua Senha Atual
          </label>
          <CustomInput
            iconLeft={<Lock className="h-4 w-4 text-gray-400" />}
            type="password"
            {...register("senhaAtual")}
            placeholder="••••••••"
            className="w-full"
            hasError={!!errors.senhaAtual}
          />
          {errors.senhaAtual ? (
            <p className="text-xs text-red-500">{errors.senhaAtual.message}</p>
          ) : (
            <p className="flex items-center gap-1 text-[11px] text-gray-400">
              <Info size={11} /> Por segurança, confirme sua senha para esta alteração.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
