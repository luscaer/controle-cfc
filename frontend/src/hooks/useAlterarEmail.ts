import { useForm } from "react-hook-form";
import {
  AlterarEmailSchema,
  type AlterarEmailFormData,
} from "../schemas/segurancaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { atualizarMeuEmail } from "../api/usuarioApi";
import { toast } from "sonner";
import axios from "axios";
import { authLogout } from "../api/authApi";

interface useAlterarEmailProps {
  onFechar: () => void;
}

export function useAlterarEmail({ onFechar }: useAlterarEmailProps) {
  const form = useForm<AlterarEmailFormData>({
    resolver: zodResolver(AlterarEmailSchema),
    mode: "onTouched",
  });

  const onSubmit = async (dados: AlterarEmailFormData) => {
    try {
      await atualizarMeuEmail(dados);
      toast.success("E-mail atualizado com Sucesso.");
      onFechar();

      await authLogout();
      window.location.href = "/login";
    } catch (error) {
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.mensagem
        : null;
      toast.error(mensagem ?? "Ocorreu um erro inesperado.");
    }
  };

  return {
    ...form,
    onSubmit,
  };
}
