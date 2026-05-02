import { Lock, Mail, Pencil, Phone, Shield, User, X } from "lucide-react";
import { useUpdateUsuario } from "../../hooks/useUpdateUsuario";
import { CustomButton } from "../ui/Button";
import { CustomInput } from "../ui/Input";
import { extrairIniciaisNome } from "../../utils/formatters";
import type { PerfilUsuario } from "../../types/perfil-usuario";

interface SlideOverPerfilProps {
  aberto: boolean;
  onFechar: () => void;
}

const PERFIL_LABELS: Record<PerfilUsuario, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMINISTRADOR: "Administrador",
  INSTRUTOR: "Instrutor",
};

const PERFIL_COLORS: Record<PerfilUsuario, string> = {
  SUPER_ADMIN:
    "bg-purple-100 text-purple-700 border-purple-200",
  ADMINISTRADOR:
    "bg-blue-100 text-blue-700 border-blue-200",
  INSTRUTOR:
    "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export function SlideOverPerfil({ aberto, onFechar }: SlideOverPerfilProps) {
  const {
    register,
    handleSubmit,
    reset,
    usuario,
    aoSubmeter,
    formState: { errors, isSubmitting },
  } = useUpdateUsuario({ onFechar });

  if (!usuario) return null;

  const fechar = () => {
    reset({ nome: usuario.nome, telefone: usuario.telefone });
    onFechar();
  };

  const iniciais = extrairIniciaisNome(usuario.nome);
  const perfilLabel = PERFIL_LABELS[usuario.perfilUsuario] ?? usuario.perfilUsuario;
  const perfilColor = PERFIL_COLORS[usuario.perfilUsuario] ?? "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div
      className={`flex fixed inset-0 z-50 transition-opacity duration-300 ${
        aberto ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={fechar}
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          aberto ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Painel Lateral */}
      <div
        className={`relative flex flex-col ml-auto w-[420px] max-w-full h-full bg-white shadow-2xl transition-transform duration-300 ease-out ${
          aberto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Meu Perfil</h1>
            <p className="text-xs text-gray-500 mt-0.5">Gerencie suas informações pessoais</p>
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

        {/* Profile Card */}
        <div className="px-6 py-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#B5D4F4] to-[#85B7EB] border-[3px] border-white shadow-lg ring-2 ring-[#85B7EB]/30">
              <span className="text-xl font-semibold text-[#0C447C] select-none">
                {iniciais}
              </span>
            </div>

            {/* Nome + Badge */}
            <h2 className="mt-3 text-base font-semibold text-gray-900">{usuario.nome}</h2>
            <span
              className={`mt-1.5 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${perfilColor}`}
            >
              <Shield size={11} />
              {perfilLabel}
            </span>
            <p className="mt-1.5 text-xs text-gray-400">{usuario.email}</p>
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
              Informações da conta
            </p>

            <div className="space-y-3">
              {/* Email (bloqueado) */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  E-mail
                  <Lock className="h-3 w-3 text-gray-300 ml-auto" />
                </label>
                <CustomInput
                  type="text"
                  value={usuario.email}
                  disabled
                  className="text-sm!"
                />
                {/* TODO: Implementar módulo de alteração de e-mail */}
                <button
                  type="button"
                  onClick={() => {/* TODO: Navegar para módulo de alterar e-mail */}}
                  className="inline-flex items-center gap-1 text-xs text-[#1C5B9E] hover:text-[#15467A] font-medium transition-colors mt-0.5"
                >
                  <Pencil className="h-3 w-3" />
                  Alterar e-mail
                </button>
              </div>

              {/* Perfil (bloqueado) */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Perfil
                  <Lock className="h-3 w-3 text-gray-300 ml-auto" />
                </label>
                <CustomInput
                  type="text"
                  value={perfilLabel}
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
              Dados pessoais
            </p>

            <div className="space-y-3">
              {/* Nome */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <CustomInput
                  iconLeft={<User className="h-4 w-4 text-gray-400" />}
                  type="text"
                  placeholder="Seu nome"
                  {...register("nome")}
                  hasError={!!errors.nome}
                />
                {errors.nome && (
                  <p className="text-xs text-red-600">{errors.nome.message}</p>
                )}
              </div>

              {/* Telefone */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <CustomInput
                  iconLeft={<Phone className="h-4 w-4 text-gray-400" />}
                  type="text"
                  placeholder="(00) 00000-0000"
                  {...register("telefone")}
                  hasError={!!errors.telefone}
                />
                {errors.telefone && (
                  <p className="text-xs text-red-600">{errors.telefone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Espaçador para empurrar o botão para o fim */}
          <div className="flex-1" />

          {/* Submit */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <CustomButton
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
