import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import {
  EsqueciSenhaSchema,
  type EsqueciSenhaFormData,
} from "../schemas/redefinirSenhaSchema";
import { esqueciSenha } from "../api/redefinirSenhaApi";

export function useEsqueciSenha() {
  const navigate = useNavigate();

  const form = useForm<EsqueciSenhaFormData>({
    resolver: zodResolver(EsqueciSenhaSchema),
    mode: "onTouched",
  });

  const aoSubmeter = async (email: EsqueciSenhaFormData) => {
    try {
      await esqueciSenha(email);
      navigate("/");
      toast.success(
        "O link de recuperação de senha foi enviado para o seu email.",
      );
    } catch (error) {
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.mensagem
        : null;
      toast.error(mensagem ?? "Ocorreu um erro inesperado.");
    }
  };

  return {
    ...form,
    aoSubmeter,
  };
}
