import { ChevronLeft, ChevronRight } from "lucide-react";

interface BotaoPaginacaoProps {
  onClick: () => void;
  disabled: boolean;
  icone: "prev" | "next";
  children: React.ReactNode;
}

export function BotaoPaginacao({ onClick, disabled, icone, children }: BotaoPaginacaoProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-[30px] items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 text-xs font-medium text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {icone === "prev" && <ChevronLeft size={13} />}
      {children}
      {icone === "next" && <ChevronRight size={13} />}
    </button>
  );
}

function gerarPaginas(paginaAtual: number, totalPaginas: number): (number | "...")[] {
  if (totalPaginas <= 7) {
    return Array.from({ length: totalPaginas }, (_, i) => i);
  }

  const paginas: (number | "...")[] = [0]; // sempre mostra a primeira

  if (paginaAtual > 3) paginas.push("...");

  // páginas ao redor da atual
  const inicio = Math.max(1, paginaAtual - 1);
  const fim    = Math.min(totalPaginas - 2, paginaAtual + 1);
  for (let i = inicio; i <= fim; i++) paginas.push(i);

  if (paginaAtual < totalPaginas - 4) paginas.push("...");

  paginas.push(totalPaginas - 1); // sempre mostra a última

  return paginas;
}

interface NumeroPaginasProps {
  paginaAtual: number;
  totalElementos: number;
  itensPorPagina: number;
  onChange: (pagina: number) => void;
}

export function NumeroPaginas({ paginaAtual, totalElementos, itensPorPagina, onChange }: NumeroPaginasProps) {
  const totalPaginas = Math.ceil(totalElementos / itensPorPagina);
  const paginas = gerarPaginas(paginaAtual, totalPaginas);

  return (
    <div className="mx-1 flex items-center gap-0.5">
      {paginas.map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className="flex h-[28px] w-[28px] items-center justify-center text-xs text-gray-400">
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`flex h-[28px] w-[28px] items-center justify-center rounded-lg text-xs font-medium transition ${
              p === paginaAtual
                ? "bg-[#1B62A5] text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            {p + 1}
          </button>
        )
      )}
    </div>
  );
}
