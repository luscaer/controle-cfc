// src/pages/AutoEscolasDashboard.tsx
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAutoEscolas } from "../hooks/useAutoEscolas";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { ErroAcesso } from "../components/ui/ErroAcesso";
import { TabelaAutoEscolas } from "../components/autoescolas/TabelaAutoEscolas";
import { BarraBusca } from "../components/autoescolas/BarraBusca";
import LogoIcon from "../assets/logo.svg?react";

const ITENS_POR_PAGINA = 10;

export function AutoEscolasDashboard() {
  const navigate = useNavigate();
  const {
    autoEscolas, paginaAtual, totalElementos,
    isLoading, erro, busca, setBusca, setPaginaAtual,
  } = useAutoEscolas();

  if (isLoading) return <LoadingScreen logo={<LogoIcon className="h-full w-full text-white" />} />;
  if (erro)      return <ErroAcesso mensagem={erro} />;

  return (
    <div className="p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Autoescolas</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Gerencie todas as autoescolas cadastradas no sistema
          </p>
        </div>
        <button
          onClick={() => navigate("/registro")}
          className="flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-[#185490]"
        >
          <Plus size={14} />
          Nova autoescola
        </button>
      </div>

      <BarraBusca
        busca={busca}
        onChange={setBusca}
        total={totalElementos}
        exibindo={autoEscolas.length}
      />

      <TabelaAutoEscolas
        autoEscolas={autoEscolas}
        busca={busca}
        paginaAtual={paginaAtual}
        totalElementos={totalElementos}
        itensPorPagina={ITENS_POR_PAGINA}
        onDetalhe={(id) => navigate(`/auto-escolas/${id}`)}
        onPaginaChange={setPaginaAtual}
      />
    </div>
  );
}