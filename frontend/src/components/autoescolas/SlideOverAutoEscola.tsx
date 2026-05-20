import {
  Building2,
  Calendar,
  CheckCircle,
  FileText,
  Lock,
  X,
  XCircle,
} from "lucide-react";
import { useUpdateAutoEscola } from "../../hooks/useUpdateAutoEscola";
import { CustomButton } from "../ui/Button";
import { CustomInput } from "../ui/Input";
import { aplicarMascaraCnpj } from "../../utils/formatters";
import { AnimatePresence, motion } from "framer-motion";
import { SPRING_SLIDE, TRANSITION_FADE } from "../../styles/animation";

interface SlideOverAutoEscolaProps {
  id: string;
  aberto: boolean;
  onFechar: () => void;
}

export function SlideOverAutoEscola({
  id,
  aberto,
  onFechar,
}: SlideOverAutoEscolaProps) {
  const {
    register,
    handleSubmit,
    reset,
    dados,
    loading,
    aoSubmeter,
    formState: { errors, isSubmitting },
  } = useUpdateAutoEscola({ id, aberto, onFechar });

  const fechar = () => {
    if (dados) {
      reset({ nome: dados.nome });
    }
    onFechar();
  };

  return (
    <AnimatePresence mode="wait">
      {aberto && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay (Fundo Escuro) */}
          <motion.div
            key="overlay"
            onClick={fechar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION_FADE}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Painel Lateral */}
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={SPRING_SLIDE}
            className="relative flex flex-col ml-auto w-[420px] max-w-full h-full bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Auto Escola
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Gerencie os dados da auto escola
                </p>
              </div>
              <CustomButton
                variant="ghost"
                onClick={fechar}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Fechar"
              >
                <X size={18} />
              </CustomButton>
            </div>

            {loading || !dados ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1C5B9E]"></div>
              </div>
            ) : (
              <>
                {/* Profile Card */}
                <div className="px-6 py-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#B5D4F4] to-[#85B7EB] border-[3px] border-white shadow-lg ring-2 ring-[#85B7EB]/30">
                      <Building2
                        className="h-8 w-8 text-[#0C447C]"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Nome + Badge */}
                    <h2 className="mt-3 text-base font-semibold text-gray-900">
                      {dados.nome}
                    </h2>
                    <span
                      className={`mt-1.5 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                        dados.ativo
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {dados.ativo ? (
                        <CheckCircle size={11} />
                      ) : (
                        <XCircle size={11} />
                      )}
                      {dados.ativo ? "Ativa" : "Inativa"}
                    </span>
                    <p className="mt-1.5 text-xs text-gray-400">
                      CNPJ: {aplicarMascaraCnpj(dados.cnpj)}
                    </p>
                  </div>
                </div>

                <div className="mx-6 border-t border-gray-100" />

                {/* Formulário */}
                <form
                  onSubmit={handleSubmit(aoSubmeter)}
                  className="flex flex-col flex-1 overflow-y-auto"
                >
                  {/* Seção: Dados somente leitura */}
                  <div className="px-6 pt-5 pb-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
                      Informações da empresa
                    </p>

                    <div className="space-y-3">
                      {/* CNPJ (bloqueado) */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          CNPJ
                          <Lock className="h-3 w-3 text-gray-300 ml-auto" />
                        </label>
                        <CustomInput
                          type="text"
                          value={aplicarMascaraCnpj(dados.cnpj)}
                          disabled
                          className="text-sm!"
                        />
                      </div>

                      {/* Data de Criação (bloqueado) */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          Data de Cadastro
                          <Lock className="h-3 w-3 text-gray-300 ml-auto" />
                        </label>
                        <CustomInput
                          type="text"
                          value={new Date(dados.dataCriacao).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                          disabled
                          className="text-sm!"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mx-6 mt-3 border-t border-gray-100" />

                  {/* Seção: Dados editáveis */}
                  <div className="px-6 pt-5 pb-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
                      Dados editáveis
                    </p>

                    <div className="space-y-3">
                      {/* Nome */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Nome Fantasia / Razão Social
                        </label>
                        <CustomInput
                          iconLeft={
                            <Building2 className="h-4 w-4 text-gray-400" />
                          }
                          type="text"
                          placeholder="Nome da Auto Escola"
                          {...register("nome")}
                          hasError={!!errors.nome}
                        />
                        {errors.nome && (
                          <p className="text-xs text-red-600">
                            {errors.nome.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Espaçador para empurrar o botão para o fim */}
                  <div className="flex-1" />

                  {/* Submit */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 mt-auto">
                    <CustomButton
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                    </CustomButton>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
