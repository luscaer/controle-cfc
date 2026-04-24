import { ArrowRight, Mail, User, Lock, ArrowLeft } from "lucide-react";
import { CabecalhoEtapa } from "../../components/ui/CabecalhoEtapa";
import { CustomInput } from "../../components/ui/Input";
import { CustomButton } from "../../components/ui/Button";
import { PerfilSelector } from "../../components/ui/PerfilSelector";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import type { RegisterFormData } from "../../schemas/registerSchema";
import { Spinner } from "../../components/ui/Spinner";

interface EtapaUsuarioProps {
  register: UseFormRegister<RegisterFormData>;
  trigger: UseFormTrigger<RegisterFormData>;
  erros: FieldErrors<RegisterFormData>;
  watch: UseFormWatch<RegisterFormData>;
  setValue: UseFormSetValue<RegisterFormData>;
  isSubmitting: boolean;
  onVoltar: () => void;
}

export function EtapaUsuario({
  register,
  trigger,
  erros,
  watch,
  setValue,
  isSubmitting,
  onVoltar,
}: EtapaUsuarioProps) {
  return (
    <div className="flex flex-col gap-4">
      <CabecalhoEtapa
        etapa={2}
        total={2}
        titulo="Cadastro do Usuário"
        subtitulo="Crie o acesso do usuário do sistema"
      />

      {/* Nome */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="nome-usuario"
        >
          Nome completo
        </label>
        <div className="relative flex items-center">
          <User className="absolute left-3 h-4 w-4 text-gray-400" />
          <CustomInput
            type="text"
            id="nome-usuario"
            placeholder="João Silva"
            className="pl-9"
            {...register("nomeUsuario")}
            hasError={!!erros.nomeUsuario}
          />
        </div>
        {erros.nomeUsuario && (
          <p className="text-xs text-red-600">{erros.nomeUsuario.message}</p>
        )}
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="email"
        >
          E-mail
        </label>
        <div className="relative flex items-center">
          <Mail className="absolute left-3 h-4 w-4 text-gray-400" />
          <CustomInput
            type="text"
            id="email"
            placeholder="joao@autoescola.com"
            className="pl-9"
            {...register("email")}
            hasError={!!erros.email}
          />
        </div>
        {erros.email && (
          <p className="text-xs text-red-600">{erros.email.message}</p>
        )}
      </div>

      {/* Senha + Confirmação lado a lado */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs font-medium uppercase tracking-wide text-gray-400"
            htmlFor="senha"
          >
            Senha
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 h-4 w-4 text-gray-400" />
            <CustomInput
              type="password"
              id="senha"
              placeholder="••••••••"
              className="pl-9"
              {...register("senha", {
                onChange: () => trigger("confirmacaoSenha"),
              })}
              hasError={!!erros.senha}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs font-medium uppercase tracking-wide text-gray-400"
            htmlFor="confirmacao-senha"
          >
            Confirmar
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 h-4 w-4 text-gray-400" />
            <CustomInput
              type="password"
              id="confirmacao-senha"
              placeholder="••••••••"
              className="pl-9"
              {...register("confirmacaoSenha", {
                onChange: () => trigger("confirmacaoSenha"),
              })}
              hasError={!!erros.confirmacaoSenha}
            />
          </div>
        </div>
      </div>

      {erros.senha && (
        <p className="text-xs text-red-600 -mt-2">{erros.senha.message}</p>
      )}

      {erros.confirmacaoSenha && (
        <p className="text-xs text-red-600 -mt-2">
          {erros.confirmacaoSenha.message}
        </p>
      )}

      {/* Perfil */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Perfil de acesso
        </label>
        <PerfilSelector
          value={watch("perfilUsuario")}
          onChange={(novoPerfil) => setValue("perfilUsuario", novoPerfil)}
        />
      </div>

      {/* Ações */}
      <div className="flex gap-2 mt-1">
        <CustomButton
          variant="ghost"
          size="md"
          onClick={onVoltar}
          type="button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </CustomButton>
        <CustomButton
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          size="md"
          className="flex-1"
        >
          {isSubmitting && <Spinner size={14} />}
          Cadastrar
          {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
        </CustomButton>
      </div>
    </div>
  );
}
