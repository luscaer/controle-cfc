import { useEffect, useState } from "react";
import type { AutoEscolaResponse } from "../types/autoescola-response";
import { buscarTodasAutoEscolas } from "../api/autoEscolaApi";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { ErroAcesso } from "../components/ui/ErroAcesso";
import { aplicarMascaraCnpj } from "../utils/formatters";
import { ArrowRight, Building2, Plus, Search } from "lucide-react";
import LogoIcon from "../assets/logo.svg?react";

export function AutoEscolasDashboard() {
  const navigate = useNavigate();

  const [autoEscolas, setAutoEscolas] = useState<AutoEscolaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const buscarAutoEscolas = async () => {
      try {
        setAutoEscolas(await buscarTodasAutoEscolas());
      } catch (error: unknown) {
        setErro("Sem permissão para acessar este recurso");
      } finally {
        setIsLoading(false);
      }
    };
    buscarAutoEscolas();
  }, []);

  if (isLoading) return <LoadingScreen logo={<LogoIcon className="h-full w-full text-white" />} />;
  if (erro) return <ErroAcesso mensagem={erro} />;

  const autoEscolasFiltradas = autoEscolas.filter(
    (ae) =>
      ae.nome.toLowerCase().includes(busca.toLowerCase()) ||
      ae.cnpj.includes(busca),
  );

  return (
    <div className="p-6">
      {/* Cabeçalho da página */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Autoescolas</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Gerencie todas as autoescolas cadastradas no sistema
          </p>
        </div>
        <button
          onClick={() => navigate("/registro")}
          className="flex items-center gap-1.5 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-800"
        >
          <Plus size={14} />
          Nova autoescola
        </button>
      </div>

      {/* Toolbar — busca + contador */}
      <div className="mb-3 flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar por nome ou CNPJ..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="h-[34px] w-full rounded-lg border border-gray-200 bg-white pl-8 pr-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
          />
        </div>
        <span className="ml-auto text-xs text-gray-400">
          {autoEscolasFiltradas.length}{" "}
          {autoEscolasFiltradas.length === 1 ? "autoescola" : "autoescolas"}
        </span>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="w-[38%] px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Nome
              </th>
              <th className="w-[30%] px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400">
                CNPJ
              </th>
              <th className="w-[16%] px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Status
              </th>
              <th className="w-[16%] px-4 py-2.5 text-right text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {autoEscolasFiltradas.map((ae) => (
              <tr
                key={ae.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {ae.nome}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">
                  {aplicarMascaraCnpj(ae.cnpj)}
                </td>
                <td className="px-4 py-3">
                  <BadgeStatus ativo={ae.ativo} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => navigate(`/auto-escolas/${ae.id}`)}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                  >
                    Detalhes
                    <ArrowRight size={12} />
                  </button>
                </td>
              </tr>
            ))}

            {autoEscolasFiltradas.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <EmptyState comBusca={busca !== ""} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BadgeStatus({ ativo }: { ativo: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
      ativo
        ? "bg-green-50 text-green-800"
        : "bg-gray-100 text-gray-500"
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ativo ? "bg-green-500" : "bg-gray-400"}`} />
      {ativo ? "Ativa" : "Inativa"}
    </span>
  );
}

function EmptyState({ comBusca }: { comBusca: boolean }) {
  return (
    <div className="py-12 text-center">
      <Building2 size={32} className="mx-auto mb-3 text-gray-300" />
      <p className="text-sm font-medium text-gray-500">
        {comBusca ? "Nenhuma autoescola encontrada" : "Nenhuma autoescola cadastrada"}
      </p>
      <p className="mt-1 text-xs text-gray-400">
        {comBusca ? "Tente buscar por outro termo" : "Clique em \"Nova autoescola\" para começar"}
      </p>
    </div>
  );
}
