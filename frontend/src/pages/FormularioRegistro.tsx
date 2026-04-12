import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/apiClient";
import { CustomInput } from "../components/ui/Input";
import { useState } from "react";
import { CustomButton } from "../components/ui/Button";
import { ArrowLeft, ArrowRight, Building, Lock, Mail, User } from "lucide-react";
import type { RegistroFormsErrors } from "../types/registro-form-errors";
import type { AutoEscolaRequest } from "../types/autoescola-request";
import type { UsuarioRequest } from "../types/usuario-request";

export function FormularioRegistro() {

    const navigate = useNavigate();
    const [etapa, setEtapa] = useState<number>(1);
    const [confirmacaoSenha, setConfirmacaoSenha] = useState<string>("");

    const [autoEscolaRequest, setAutoEscolaRequest] = useState<AutoEscolaRequest>({
        nome: "",
        cnpj: "",
    });

    const [usuarioRequest, setUsuarioRequest] = useState<UsuarioRequest>({
        nome: "",
        email: "",
        senha: "",
        perfilUsuario: "INSTRUTOR"
    });

    const [registroDeErros, setRegistroDeErros] = useState<RegistroFormsErrors>({
        nomeAutoEscola: "",
        cnpj: "",
        nomeUsuario: "",
        email: "",
        senha: ""
    });

    const validarCampo = (campo: keyof RegistroFormsErrors, valor: string): boolean => {
        let mensagemErro = "";

        switch (campo) {
            case "nomeAutoEscola":
            case "nomeUsuario":
                if (valor.trim().length < 2) {
                    mensagemErro = "O nome deve ter pelo menos 2 caracteres.";
                }
                break;

            case "cnpj":
                if (valor.replace(/\D/g, "").length !== 14) {
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
    }

    const avancarEtapa = () => {
        const resultados = [
            validarCampo("nomeAutoEscola", autoEscolaRequest.nome),
            validarCampo("cnpj", autoEscolaRequest.cnpj),
        ]

        const validacao = resultados.every(resultado => resultado === true);

        if (validacao) {
            setEtapa(etapa => etapa + 1);
        }
    }

    const retrocederEtapa = () => {
        setEtapa(etapa => etapa - 1);
    }

    const registrar = async () => {
        const resultados = [
            validarCampo("nomeUsuario", usuarioRequest.nome),
            validarCampo("email", usuarioRequest.email),
            validarCampo("senha", usuarioRequest.senha),
        ]

        const validacao = resultados.every(resultado => resultado === true);

        if(validacao) {
            try {
                const registro = {
                    requestAutoEscola: autoEscolaRequest,
                    requestUsuario: usuarioRequest
                };

                await apiClient.post('/v1/registro/super', registro);
                return true;
            } catch (error) {
                console.log("Erro no registro: ", error);
                return false;
            }
        }

        return false;
    };

    const aoSubmeter = async (evento: React.SyntheticEvent<HTMLFormElement>) => {
        evento.preventDefault();
        const sucesso = await registrar();

        if (sucesso) navigate("/");
    }

    return (
        <form onSubmit={aoSubmeter} className="flex flex-col gap-4">

            {etapa === 1 && (
                <>
                    <div>
                        <h1>
                            Cadastro de Auto Escola
                        </h1>
                    </div>
                    {/* Campo nome */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="nome-autoescola">
                            Nome
                        </label>
                        <div className="relative flex items-center">
                            <User className="absolute left-3 h-4 w-4 text-gray-400" />
                            <CustomInput
                                type="text"
                                id="nome-autoescola"
                                placeholder="Auto Escola ..."
                                className="pl-9"
                                value={autoEscolaRequest.nome}
                                onChange={(e) => setAutoEscolaRequest({ ...autoEscolaRequest, nome: e.target.value })}
                                onBlur={(e) => validarCampo("nomeAutoEscola", e.target.value)}
                                hasError={registroDeErros.nomeAutoEscola !== ""}
                            />
                        </div>
                    </div>

                    {/* Campo CNPJ */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="cnpj">
                            CNPJ
                        </label>
                        <div className="relative flex items-center">
                            <Building className="absolute left-3 h-4 w-4 text-gray-400" />
                            <CustomInput
                                type="text"
                                id="cnpj"
                                placeholder="00.000.000/0000-00"
                                className="pl-9"
                                value={autoEscolaRequest.cnpj}
                                onChange={(e) => setAutoEscolaRequest({ ...autoEscolaRequest, cnpj: e.target.value })}
                                onBlur={(e) => validarCampo("cnpj", e.target.value)}
                                hasError={registroDeErros.cnpj !== ""}
                            />
                        </div>
                    </div>

                    <CustomButton variant="primary" size="md" onClick={avancarEtapa} className="font-bold">
                        Próximo
                        <ArrowRight className="h-4 w-4 ml-2 text-white-400 text-bold" />
                    </CustomButton>
                </>
            )}
            {etapa === 2 && (
                <>
                    <div>
                        <h1>
                            Cadastro de Usuário
                        </h1>
                    </div>
                    {/* Campo nome */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="nome-usuario">
                            Nome
                        </label>
                        <div className="relative flex items-center">
                            <User className="absolute left-3 h-4 w-4 text-gray-400" />
                            <CustomInput
                                type="text"
                                id="nome-usuario"
                                placeholder="João Silva"
                                className="pl-9"
                                value={usuarioRequest.nome}
                                onChange={(e) => setUsuarioRequest({ ...usuarioRequest, nome: e.target.value })}
                                onBlur={(e) => validarCampo("nomeUsuario", e.target.value)}
                                hasError={registroDeErros.nomeUsuario !== ""}
                            />
                        </div>
                    </div>

                    {/* Campo E-mail */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="email">
                            E-mail
                        </label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-3 h-4 w-4 text-gray-400" />
                            <CustomInput
                                type="text"
                                id="email"
                                placeholder="joao.silva@gmail.com"
                                className="pl-9"
                                value={usuarioRequest.email}
                                onChange={(e) => setUsuarioRequest({ ...usuarioRequest, email: e.target.value })}
                                onBlur={(e) => validarCampo("email", e.target.value)}
                                hasError={registroDeErros.email !== ""}
                            />
                        </div>
                    </div>

                    {/* Campo Senha */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="senha">
                            Insira sua senha
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3 h-4 w-4 text-gray-400" />
                            <CustomInput
                                type="password"
                                id="senha"
                                placeholder="********"
                                className="pl-9"
                                value={usuarioRequest.senha}
                                onChange={(e) => setUsuarioRequest({ ...usuarioRequest, senha: e.target.value })}
                                onBlur={(e) => validarCampo("senha", e.target.value)}
                                hasError={registroDeErros.senha !== ""}
                            />
                        </div>
                    </div>

                    {/* Campo Confirmação de Senha */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="confirmacao-senha">
                            Confirme sua senha
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3 h-4 w-4 text-gray-400" />
                            <CustomInput
                                type="password"
                                id="confirmacao-senha"
                                placeholder="********"
                                className="pl-9"
                                value={confirmacaoSenha}
                                onChange={(e) => setConfirmacaoSenha(e.target.value)}
                                onBlur={(e) => validarCampo("senha", e.target.value)}
                                hasError={registroDeErros.senha !== ""}
                            />
                        </div>
                    </div>

                    {/* Campo Perfil de Usuário */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="confirmacao-senha">
                            Selecione o Perfil
                        </label>
                        <div className="relative flex items-center">
                            <User className="absolute left-3 h-4 w-4 text-gray-400" />
                            {/* Deveria criar um componente pra selecionar um dos perfis né?*/}
                        </div>
                    </div>

                    <CustomButton variant="primary" size="md" onClick={retrocederEtapa} className="font-bold">
                        <ArrowLeft className="h-4 w-4 mr-2 text-white-400 text-bold" />
                        Voltar
                    </CustomButton>
                    <CustomButton type="submit" variant="primary" size="md" className="font-bold">
                        Cadastrar
                        <ArrowRight className="h-4 w-4 ml-2 text-white-400 text-bold" />
                    </CustomButton>
                </>
            )}
        </form>
    );
}