import { Search } from "lucide-react";
import { tratarBuscaAutoEscola } from "../../utils/formatters";

interface BarraBuscaProps {
  busca: string;
  onChange: (busca: string) => void;
  total: number;
  exibindo: number;
}

export function BarraBusca({
  busca,
  onChange,
  total,
  exibindo,
}: BarraBuscaProps) {
  return (
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
          onChange={(e) => onChange(tratarBuscaAutoEscola(e.target.value))}
          className="h-[34px] w-full rounded-lg border border-gray-200 bg-white pl-8 pr-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
        />
      </div>
      <span className="ml-auto text-xs text-gray-400">
        {exibindo}
        {" de "}
        {total} {exibindo === 1 ? "autoescola" : "autoescolas"}
      </span>
    </div>
  );
}
