import { useEffect, useState } from "react";
import type { AutoEscolaResponse } from "../types/autoescola-response";
import { buscarTodasAutoEscolas } from "../api/autoEscolaApi";
import axios from "axios";
import { toast } from "sonner";

const ITENS_POR_PAGINA = 10;

interface UseAutoEscolasReturn {
  autoEscolas: AutoEscolaResponse[];
  paginaAtual: number;
  totalElementos: number;
  isLoading: boolean;
  erro: string | null;
  busca: string;
  setBusca: (busca: string) => void;
  setPaginaAtual: (pagina: number) => void;
}

export function useAutoEscolas(): UseAutoEscolasReturn {
  const [autoEscolas, setAutoEscolas] = useState<AutoEscolaResponse[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalElementos, setTotalElementos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  const handleSetBusca = (novaBusca: string) => {
    setBusca(novaBusca);
    setPaginaAtual(0);
  };

  useEffect(() => {
    const buscar = async () => {
      try {
        const pagina = await buscarTodasAutoEscolas(
          paginaAtual,
          ITENS_POR_PAGINA,
          busca,
        );
        setAutoEscolas(pagina.content);
        setTotalElementos(pagina.totalElements);
      } catch (error) {
        const mensagem = axios.isAxiosError(error)
          ? error.response?.data?.mensagem
          : null;
        toast.error(mensagem ?? "Ocorreu um erro inesperado. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };
    buscar();
  }, [paginaAtual, busca]);

  return {
    autoEscolas,
    paginaAtual,
    totalElementos,
    isLoading,
    erro,
    busca,
    setBusca: handleSetBusca,
    setPaginaAtual,
  };
}
