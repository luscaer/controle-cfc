import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import type { AutoEscolaResponse } from "../types/autoescola-response";
import {
  AutoEscolaValidatorSchema,
  type AutoEscolaFormData,
} from "../schemas/autoEscolaSchema";
import { atualizarAutoEscola, buscarAutoEscola } from "../api/autoEscolaApi";

interface useUpdateAutoEscolaProps {
  id: string;
  aberto: boolean;
  onFechar: () => void;
}

export function useUpdateAutoEscola({
  id,
  aberto,
  onFechar,
}: useUpdateAutoEscolaProps) {
  const [dados, setDados] = useState<AutoEscolaResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<AutoEscolaFormData>({
    resolver: zodResolver(AutoEscolaValidatorSchema),
    defaultValues: { nome: dados?.nome },
    mode: "onTouched",
  });

  useEffect(() => {
    const carregarDados = async () => {
      if (aberto && id) {
        try {
          setLoading(true);
          const response = await buscarAutoEscola(id);
          setDados(response);

          form.reset({
            nome: response.nome,
          });
        } catch (error) {
          const mensagem = axios.isAxiosError(error)
            ? error.response?.data?.mensagem
            : null;
          toast.error(mensagem ?? "Ocorreu um erro inesperado.");
        } finally {
            setLoading(false);
        }
      }
    }

    carregarDados();
  }, [aberto, id]);

  const aoSubmeter = async (dados: AutoEscolaFormData) => {
    try {
      await atualizarAutoEscola(id, dados);
      toast.success("Auto Escola atualizada com Sucesso.");
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
    dados,
    loading,
    aoSubmeter,
  };
}
