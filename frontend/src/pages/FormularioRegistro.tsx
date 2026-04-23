import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/apiClient";
import { useState } from "react";
import type { RegistroFormsErrors } from "../types/registro-form-errors";
import type { AutoEscolaRequest } from "../types/autoescola-request";
import type { UsuarioRequest } from "../types/usuario-request";
import { EtapaAutoEscola } from "./registro/EtapaAutoEscola";
import { EtapaUsuario } from "./registro/EtapaUsuario";
import { validarCnpj } from "../utils/validators";
import axios from "axios";
import { toast } from "sonner";

interface FormularioRegistroProps {
  etapa: number;
  setEtapa: React.Dispatch<React.SetStateAction<number>>;
}

export function FormularioRegistro({
  etapa,
  setEtapa,
}: FormularioRegistroProps) {
  const navigate = useNavigate();
  const [confirmacaoSenha, setConfirmacaoSenha] = useState<string>("");

  const [autoEscolaRequest, setAutoEscolaRequest] = useState<AutoEscolaRequest>(
    {
      nome: "",
      cnpj: "",
    },
  );

  const [usuarioRequest, setUsuarioRequest] = useState<UsuarioRequest>({
    nome: "",
    email: "",
    senha: "",
    perfilUsuario: "INSTRUTOR",
  });

  const [registroDeErros, setRegistroDeErros] = useState<RegistroFormsErrors>({
    nomeAutoEscola: "",
    cnpj: "",
    nomeUsuario: "",
    email: "",
    senha: "",
  });

  const validarCampo = (
    campo: keyof RegistroFormsErrors,
    valor: string,
  ): boolean => {
    let mensagemErro = "";

    switch (campo) {
      case "nomeAutoEscola":
      case "nomeUsuario":
        if (valor.trim().length < 2) {
          mensagemErro = "O nome deve ter pelo menos 2 caracteres.";
        }
        break;

      case "cnpj":
        if (!validarCnpj(valor)) {
          mensagemErro = "CNPJ inválido.";
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(valor)) {
          mensagemErro = "E-mail inválido.";
        }
        break;

      case "senha":
        if (valor.trim().length < 6) {
          mensagemErro = "A senha deve ter no mínimo 6 caracteres.";
        }
        if (confirmacaoSenha !== "" && confirmacaoSenha !== valor) {
          mensagemErro = "As senhas não conferem.";
        }
        break;

      default:
        break;
    }

    setRegistroDeErros((prev) => ({
      ...prev,
      [campo]: mensagemErro,
    }));

    return mensagemErro === "";
  };

  const avancarEtapa = () => {
    const resultados = [
      validarCampo("nomeAutoEscola", autoEscolaRequest.nome),
      validarCampo("cnpj", autoEscolaRequest.cnpj),
    ];

    const validacao = resultados.every((resultado) => resultado === true);

    if (validacao) {
      setEtapa((etapa) => etapa + 1);
    }
  };

  const retrocederEtapa = () => {
    setEtapa((etapa) => etapa - 1);
  };

  const registrar = async () => {
    const resultados = [
      validarCampo("nomeUsuario", usuarioRequest.nome),
      validarCampo("email", usuarioRequest.email),
      validarCampo("senha", usuarioRequest.senha),
    ];

    const validacao = resultados.every((resultado) => resultado === true);

    if (validacao) {
      try {
        const registro = {
          requestAutoEscola: autoEscolaRequest,
          requestUsuario: usuarioRequest,
        };

        await apiClient.post("/v1/registro/super", registro);
        toast.success("Cadastro realizado!");
        return true;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const mensagem = error.response?.data?.mensagem;
          toast.error(mensagem ?? "Ocorreu um erro inesperado.");
        } else {
          toast.error("Ocorreu um erro inesperado. Tente novamente.");
        }
        return false;
      }
    }

    return false;
  };

  const aoSubmeter = async (evento: React.SyntheticEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const sucesso = await registrar();

    if (sucesso) navigate("/");
  };

  return (
    <form onSubmit={aoSubmeter}>
      {etapa === 1 && (
        <EtapaAutoEscola
          dados={autoEscolaRequest}
          erros={registroDeErros}
          onChange={setAutoEscolaRequest}
          onBlur={validarCampo}
          onAvancar={avancarEtapa}
        />
      )}
      {etapa === 2 && (
        <EtapaUsuario
          dados={usuarioRequest}
          erros={registroDeErros}
          confirmacaoSenha={confirmacaoSenha}
          onChange={setUsuarioRequest}
          onBlur={validarCampo}
          onConfirmacaoSenhaChange={setConfirmacaoSenha}
          onVoltar={retrocederEtapa}
        />
      )}
    </form>
  );
}
