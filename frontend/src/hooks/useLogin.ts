import { useForm } from "react-hook-form";
import {
  LoginValidatorSchema,
  type LoginFormData,
} from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginValidatorSchema),
    mode: "onTouched",
  });

  const aoSubmeter = async (dados: LoginFormData) => {
    try {
      await login(dados);
      navigate("/");
    } catch (error) {
      console.log("ERRO COMPLETO DO AXIOS:", error);

      if (axios.isAxiosError(error)) {
        console.log("DADOS DA RESPOSTA:", error.response?.data);
      }
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.mensagem
        : null;
      toast.error(mensagem ?? "Ocorreu um erro inesperado ao realizar login.");
    }
  };

  return {
    ...form,
    aoSubmeter,
  };
}
