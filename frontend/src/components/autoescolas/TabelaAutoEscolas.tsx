import { ArrowRight, Building2 } from "lucide-react";
import type { AutoEscolaResponse } from "../../types/autoescola-response";
import { aplicarMascaraCnpj } from "../../utils/formatters";
import { BotaoPaginacao, NumeroPaginas } from "../ui/Paginacao";

interface TabelaAutoEscolasProps {
  autoEscolas: AutoEscolaResponse[];
  busca: string;
  paginaAtual: number;
  totalElementos: number;
  itensPorPagina: number;
  onDetalhe: (id: string) => void;
  onPaginaChange: (novaPagina: number) => void;
}

export function TabelaAutoEscolas({
  autoEscolas,
  busca,
  paginaAtual,
  totalElementos,
  itensPorPagina,
  onDetalhe,
  onPaginaChange,
}: TabelaAutoEscolasProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse md:min-w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Nome
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400">
                CNPJ
              </th>
              <th className="hidden px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400 sm:table-cell">
                Status
              </th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {autoEscolas.map((ae) => (
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
                <td className="hidden px-4 py-3 sm:table-cell">
                  <BadgeStatus ativo={ae.ativo} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onDetalhe(ae.id)}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                  >
                    Detalhes
                    <ArrowRight size={12} />
                  </button>
                </td>
              </tr>
            ))}
 
            {autoEscolas.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <EmptyState comBusca={busca !== ""} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3">
        {/* Info */}
        <span className="text-xs text-gray-400">
          Mostrando{" "}
          <span className="font-medium text-gray-600">
            {paginaAtual * 10 + 1}–
            {Math.min((paginaAtual + 1) * 10, totalElementos)}
          </span>{" "}
          de <span className="font-medium text-gray-600">{totalElementos}</span>{" "}
          autoescolas
        </span>

        {/* Controles */}
        <div className="flex items-center gap-1">
          <BotaoPaginacao
            onClick={() => onPaginaChange(paginaAtual - 1)}
            disabled={paginaAtual === 0}
            icone="prev"
          >
            Anterior
          </BotaoPaginacao>

          <NumeroPaginas
            paginaAtual={paginaAtual}
            totalElementos={totalElementos}
            itensPorPagina={itensPorPagina}
            onChange={onPaginaChange}
          />

          <BotaoPaginacao
            onClick={() => onPaginaChange(paginaAtual + 1)}
            disabled={(paginaAtual + 1) * 10 >= totalElementos}
            icone="next"
          >
            Próxima
          </BotaoPaginacao>
        </div>
      </div>
    </div>
  );
}

function BadgeStatus({ ativo }: { ativo: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
        ativo ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${ativo ? "bg-green-500" : "bg-gray-400"}`}
      />
      {ativo ? "Ativa" : "Inativa"}
    </span>
  );
}

function EmptyState({ comBusca }: { comBusca: boolean }) {
  return (
    <div className="py-12 text-center">
      <Building2 size={32} className="mx-auto mb-3 text-gray-300" />
      <p className="text-sm font-medium text-gray-500">
        {comBusca
          ? "Nenhuma autoescola encontrada"
          : "Nenhuma autoescola cadastrada"}
      </p>
      <p className="mt-1 text-xs text-gray-400">
        {comBusca
          ? "Tente buscar por outro termo"
          : 'Clique em "Nova autoescola" para começar'}
      </p>
    </div>
  );
}
