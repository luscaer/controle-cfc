import { useEffect, useState } from "react";
import { type AutoEscolaResponse } from "../types/autoescola-response";
import { ativarAutoEscola, atualizarAutoEscola, buscarAutoEscola, desativarAutoEscola } from "../api/autoEscolaApi";
import axios from "axios";
import { toast } from "sonner";
import {
  AutoEscolaValidatorSchema,
  type AutoEscolaFormData,
} from "../schemas/autoEscolaSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UsuarioResumedResponse } from "../types/usuario-response";
import { buscarUsuariosPelaAutoEscolaEPeloPerfil } from "../api/usuarioApi";

export function useAutoEscola(id: string | undefined) {
  const [autoEscola, setAutoEscola] = useState<AutoEscolaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usuariosPorPerfil, setUsuariosPorPerfil] = useState<UsuarioResumedResponse[]>([]);

  const form = useForm<AutoEscolaFormData>({
    resolver: zodResolver(AutoEscolaValidatorSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    const buscarAutoEscolaPeloId = async () => {
      if (!id) return;
      try {
        const [resAutoEscola, resUsuarios] = await Promise.all([buscarAutoEscola(id as string), buscarUsuariosPelaAutoEscolaEPeloPerfil(id as string, "ADMINISTRADOR")])
        setAutoEscola(resAutoEscola);
        setUsuariosPorPerfil(resUsuarios);
        form.reset(resAutoEscola)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const mensagem = error.response?.data?.mensagem;
          toast.error(mensagem ?? "Ocorreu um erro inesperado.");
        } else {
          toast.error("Ocorreu um erro inesperado. Tente novamente.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    buscarAutoEscolaPeloId();
  }, [id, form]);

  const handleUpdate = async (dados: AutoEscolaFormData) => {
    if (!id) return;
    try {
      setIsSubmitting(true);
      const response = await atualizarAutoEscola(id, dados);
      setAutoEscola(response);
      form.reset(response);
      toast.success("Dados atualizados com sucesso!");
      return true;
    } catch (error) {
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.mensagem
        : null;
      toast.error(mensagem ?? "Ocorreu um erro inesperado. Tente novamente.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!id || !autoEscola) return;
    try {
      setIsSubmitting(true);
      if (!autoEscola.ativo) {
        await ativarAutoEscola(id);
        setAutoEscola({ ...autoEscola, ativo: true } as AutoEscolaResponse);
        toast.success("AutoEscola ativada com sucesso!");
      } else {
        await desativarAutoEscola(id);
        setAutoEscola({ ...autoEscola, ativo: false } as AutoEscolaResponse);
        toast.success("AutoEscola desativada com sucesso!");
      }
    } catch (error) {
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.mensagem
        : null;
      toast.error(mensagem ?? "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { autoEscola, usuariosPorPerfil, isLoading, isSubmitting, handleUpdate, handleUpdateStatus, ...form };

}
