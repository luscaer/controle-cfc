import { ArrowRight, Mail, User, Lock, ArrowLeft } from "lucide-react";
import { CabecalhoEtapa } from "../../components/ui/CabecalhoEtapa";
import type { RegistroFormsErrors } from "../../types/registro-form-errors";
import { CustomInput } from "../../components/ui/Input";
import { CustomButton } from "../../components/ui/Button";
import type { UsuarioRequest } from "../../types/usuario-request";
import { PerfilSelector } from "../../components/ui/PerfilSelector";

interface EtapaUsuarioProps {
  dados: UsuarioRequest;
  erros: RegistroFormsErrors;
  confirmacaoSenha: string;
  onChange: (dados: UsuarioRequest) => void;
  onBlur: (campo: keyof RegistroFormsErrors, valor: string) => void;
  onConfirmacaoSenhaChange: (valor: string) => void;
  onVoltar: () => void;
}

export function EtapaUsuario({
  dados,
  erros,
  confirmacaoSenha,
  onChange,
  onBlur,
  onConfirmacaoSenhaChange,
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
        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="nome-usuario">
          Nome completo
        </label>
        <div className="relative flex items-center">
          <User className="absolute left-3 h-4 w-4 text-gray-400" />
          <CustomInput
            type="text"
            id="nome-usuario"
            placeholder="João Silva"
            className="pl-9"
            value={dados.nome}
            onChange={(e) => onChange({ ...dados, nome: e.target.value })}
            onBlur={(e) => onBlur("nomeUsuario", e.target.value)}
            hasError={erros.nomeUsuario !== ""}
          />
        </div>
        {erros.nomeUsuario && (
          <p className="text-xs text-red-600">{erros.nomeUsuario}</p>
        )}
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="email">
          E-mail
        </label>
        <div className="relative flex items-center">
          <Mail className="absolute left-3 h-4 w-4 text-gray-400" />
          <CustomInput
            type="text"
            id="email"
            placeholder="joao@autoescola.com"
            className="pl-9"
            value={dados.email}
            onChange={(e) => onChange({ ...dados, email: e.target.value })}
            onBlur={(e) => onBlur("email", e.target.value)}
            hasError={erros.email !== ""}
          />
        </div>
        {erros.email && (
          <p className="text-xs text-red-600">{erros.email}</p>
        )}
      </div>

      {/* Senha + Confirmação lado a lado */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="senha">
            Senha
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 h-4 w-4 text-gray-400" />
            <CustomInput
              type="password"
              id="senha"
              placeholder="••••••••"
              className="pl-9"
              value={dados.senha}
              onChange={(e) => onChange({ ...dados, senha: e.target.value })}
              onBlur={(e) => onBlur("senha", e.target.value)}
              hasError={erros.senha !== ""}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="confirmacao-senha">
            Confirmar
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 h-4 w-4 text-gray-400" />
            <CustomInput
              type="password"
              id="confirmacao-senha"
              placeholder="••••••••"
              className="pl-9"
              value={confirmacaoSenha}
              onChange={(e) => onConfirmacaoSenhaChange(e.target.value)}
              onBlur={(e) => onBlur("senha", e.target.value)}
              hasError={erros.senha !== ""}
            />
          </div>
        </div>
      </div>

      {erros.senha && (
        <p className="text-xs text-red-600 -mt-2">{erros.senha}</p>
      )}

      {/* Perfil */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Perfil de acesso
        </label>
        <PerfilSelector
          value={dados.perfilUsuario}
          onChange={(perfil) => onChange({ ...dados, perfilUsuario: perfil })}
        />
      </div>

      {/* Ações */}
      <div className="flex gap-2 mt-1">
        <CustomButton variant="ghost" size="md" onClick={onVoltar} type="button">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </CustomButton>
        <CustomButton type="submit" variant="primary" size="md" className="flex-1">
          Cadastrar
          <ArrowRight className="ml-2 h-4 w-4" />
        </CustomButton>
      </div>
    </div>
  );
}
