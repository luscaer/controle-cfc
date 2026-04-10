import { useNavigate } from "react-router-dom";
import { CustomInput } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import type { LoginCredentials } from "../types/auth";
import { CustomButton } from "../components/ui/Button";
import { LockIcon, MailIcon } from "lucide-react";

export function FormularioLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [credenciais, setCredenciais] = useState<LoginCredentials>({
        email: "",
        senha: "",
    });

    const aoSubmeter = async (evento: React.SyntheticEvent<HTMLFormElement>) => {
        evento.preventDefault();
        const sucesso = await login(credenciais);

        if (sucesso) navigate("/");
    };


    return (
    <form onSubmit={aoSubmeter} className="flex flex-col gap-4">

        {/* Campo e-mail */}
        <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="email">
            E-mail
        </label>
        <div className="relative flex items-center">
            <MailIcon className="absolute left-3 h-4 w-4 text-gray-400" />
            <CustomInput
            type="text"
            id="email"
            placeholder="seu@email.com"
            className="pl-9"
            value={credenciais.email}
            onChange={(e) => setCredenciais({ ...credenciais, email: e.target.value })}
            />
        </div>
        </div>

        {/* Campo senha */}
        <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wide text-gray-400" htmlFor="senha">
            Senha
        </label>
        <div className="relative flex items-center">
            <LockIcon className="absolute left-3 h-4 w-4 text-gray-400" />
            <CustomInput
            type="password"
            id="senha"
            placeholder="••••••••"
            className="pl-9"
            value={credenciais.senha}
            onChange={(e) => setCredenciais({ ...credenciais, senha: e.target.value })}
            />
        </div>
        </div>

        {/* Esqueceu a senha */}
        <div className="text-right -mt-1">
        <a href="#" className="text-xs text-[#1B62A5] hover:underline">
            Esqueceu a senha?
        </a>
        </div>

        <CustomButton type="submit" variant="primary" size="md">
        Entrar
        </CustomButton>

    </form>
    );
}