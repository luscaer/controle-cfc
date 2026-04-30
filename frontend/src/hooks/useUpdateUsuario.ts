import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import { UsuarioUpdateSchema, type UsuarioUpdateData } from "../schemas/usuarioSchema";

interface useUpdateUsuarioProps {
    onFechar: () => void;
}

export function useUpdateUsuario({ onFechar }: useUpdateUsuarioProps) {
  const { usuario, updateMyUser } = useAuth();

  const form = useForm<UsuarioUpdateData>({
    resolver: zodResolver(UsuarioUpdateSchema),
    defaultValues: {nome: usuario?.nome, telefone: usuario?.telefone},
    mode: "onTouched",
  });

  const aoSubmeter = async (dados: UsuarioUpdateData) => {
    try {
      await updateMyUser(dados);
      toast.success("Usuario atualizado com Sucesso.");
      onFechar();
    } catch (error) {
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.mensagem
        : null;
      toast.error(mensagem ?? "Ocorreu um erro inesperado.");
    }
  };

  return {
    ...form,
    usuario,
    aoSubmeter,
  };
}
