import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { RedefinirSenhaSchema, type RedefinirSenhaFormData } from "../schemas/redefinirSenha";
import { redefinirSenha } from "../api/redefinirSenhaApi";

export function useRedefinirSenha(token: string | undefined) {
  
  const navigate = useNavigate();

  const form = useForm<RedefinirSenhaFormData>({
    resolver: zodResolver(RedefinirSenhaSchema),
    mode: "onTouched",
  });

  const aoSubmeter = async (request: RedefinirSenhaFormData) => {
    try {
      if (!token) return;
      await redefinirSenha(token, request);
      navigate("/");
      toast.success("Senha redefinida com sucesso.");
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
