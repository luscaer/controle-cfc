import { ArrowRight, Mail, User, Lock, ArrowLeft, Phone } from "lucide-react";
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
import { aplicarMascaraTelefone } from "../../utils/formatters";
import { useState } from "react";

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
  useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up">
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

        <CustomInput
          iconLeft={<User className="h-4 w-4 text-gray-400" />}
          type="text"
          id="nome-usuario"
          placeholder="João Silva"
          {...register("nomeUsuario")}
          hasError={!!erros.nomeUsuario}
        ></CustomInput>

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

        <CustomInput
          iconLeft={<Mail className="h-4 w-4 text-gray-400" />}
          type="email"
          id="email"
          placeholder="joao@autoescola.com"
          {...register("email")}
          hasError={!!erros.email}
        ></CustomInput>

        {erros.email && (
          <p className="text-xs text-red-600">{erros.email.message}</p>
        )}
      </div>

      {/* Telefone */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="telefone"
        >
          Número de Telefone
        </label>

        <CustomInput
          iconLeft={<Phone className="h-4 w-4 text-gray-400" />}
          type="text"
          id="telefone"
          placeholder="(99) 9999-9999"
          {...register("telefone", {
            onChange: (evento) => {
              evento.target.value = aplicarMascaraTelefone(evento.target.value);
            },
          })}
          hasError={!!erros.telefone}
        ></CustomInput>

        {erros.telefone && (
          <p className="text-xs text-red-600">{erros.telefone.message}</p>
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

          <CustomInput
            iconLeft={<Lock className="h-4 w-4 text-gray-400" />}
            type="password"
            id="senha"
            placeholder="••••••••"
            {...register("senha", {
              onChange: () => trigger("confirmacaoSenha"),
            })}
            hasError={!!erros.senha}
            showToggle={true}
          ></CustomInput>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs font-medium uppercase tracking-wide text-gray-400"
            htmlFor="confirmacao-senha"
          >
            Confirmar
          </label>

          <CustomInput
            iconLeft={<Lock className="h-4 w-4 text-gray-400" />}
            type="password"
            id="confirmacao-senha"
            placeholder="••••••••"
            {...register("confirmacaoSenha", {
              onChange: () => trigger("confirmacaoSenha"),
            })}
            hasError={!!erros.confirmacaoSenha}
            showToggle={true}
          ></CustomInput>
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
          hasError={!!erros.perfilUsuario}
        />

        {erros.perfilUsuario && (
          <p className="text-xs text-red-600">{erros.perfilUsuario.message}</p>
        )}
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
