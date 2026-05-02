import { useEffect, useState } from "react";
import type { AutoEscolaResponse } from "../types/autoescola-response";
import { buscarTodasAutoEscolas } from "../api/autoEscolaApi";
import axios from "axios";
import { toast } from "sonner";

const ITENS_POR_PAGINA = 10;

export function useAutoEscolas() {
  const [autoEscolas, setAutoEscolas] = useState<AutoEscolaResponse[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalElementos, setTotalElementos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [buscaDebounced, setBuscaDebounced] = useState(busca);

  const handleSetBusca = (novaBusca: string) => {
    setBusca(novaBusca);
    setPaginaAtual(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => setBuscaDebounced(busca), 500);
    return () => clearTimeout(timer);
  }, [busca]);

  useEffect(() => {
    const buscar = async () => {
      try {
        const pagina = await buscarTodasAutoEscolas(
          paginaAtual,
          ITENS_POR_PAGINA,
          buscaDebounced,
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
  }, [paginaAtual, buscaDebounced]);

  return {
    autoEscolas,
    paginaAtual,
    totalElementos,
    isLoading,
    busca,
    setBusca: handleSetBusca,
    setPaginaAtual,
  };
}
