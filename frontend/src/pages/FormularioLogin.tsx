import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  LoginValidatorSchema,
  type LoginFormData,
} from "../schemas/authSchema";

import { CustomInput } from "../components/ui/Input";
import { CustomButton } from "../components/ui/Button";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "../components/ui/Spinner";

export function FormularioLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginValidatorSchema), mode:"onTouched" });

  const aoSubmeter = async (dados: LoginFormData) => {
    const sucesso = await login(dados);

    if (sucesso) {
      navigate("/");
    } else {
      toast.error("Usuário ou senha estão incorretos");
    }
  };

  return (
    <form onSubmit={handleSubmit(aoSubmeter)} className="flex flex-col gap-4">
      {/* Campo e-mail */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="email"
        >
          E-mail
        </label>
        <div className="relative flex items-center">
          <MailIcon className="absolute left-3 h-4 w-4 text-gray-400" />
          <CustomInput
            type="text"
            id="email"
            placeholder="seu@email.com"
            className="pl-9"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </div>

      {/* Campo senha */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="senha"
        >
          Senha
        </label>
        <div className="relative flex items-center">
          <LockIcon className="absolute left-3 h-4 w-4 text-gray-400" />
          <CustomInput
            type="password"
            id="senha"
            placeholder="••••••••"
            className="pl-9"
            {...register("senha")}
          />
        </div>
        {errors.senha && (
          <span className="text-red-500 text-xs">{errors.senha.message}</span>
        )}
      </div>

      {/* Esqueceu a senha */}
      <div className="text-right -mt-1">
        <a href="#" className="text-xs text-primary-500 hover:underline">
          Esqueceu a senha?
        </a>
      </div>

      <CustomButton type="submit" disabled={isSubmitting} variant="primary" size="md">
        {isSubmitting && <Spinner size={14} />} 
        Entrar
      </CustomButton>
    </form>
  );
}
