import { Mail, Info, Send } from "lucide-react";
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Spinner } from "./Spinner";
import type { ConviteFormData } from "../../schemas/conviteSchema";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white">

        {/* Cabeçalho */}
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <Mail size={14} className="text-blue-800" />
            </div>
            <p className="text-sm font-medium text-gray-900">Convidar autoescola</p>
          </div>
          <p className="ml-[38px] mt-1 text-xs leading-relaxed text-gray-500">
            Um e-mail será enviado com instruções para criar a conta.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">

          <div className="mb-5 flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
              E-mail do responsável
            </label>
            <div className="relative flex items-center">
              <Mail size={14} className="absolute left-2.5 text-gray-400" />
              <input
                type="email"
                {...register("email")}
                placeholder="contato@autoescola.com.br"
                className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 text-sm outline-none transition focus:border-[#1B62A5] focus:ring-2 focus:ring-[#1B62A5]/10"
              />
            </div>
            {errors.email ? (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            ) : (
              <p className="flex items-center gap-1 text-[11px] text-gray-400">
                <Info size={11} />
                O link expira em 24 horas após o envio.
              </p>
            )}
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-[34px] rounded-lg border border-gray-200 px-4 text-xs font-medium text-gray-500 transition hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-[34px] items-center gap-1.5 rounded-lg bg-[#1B62A5] px-4 text-xs font-medium text-white transition hover:bg-[#185490] disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Spinner size={12} />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={12} />
                  Enviar convite
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}