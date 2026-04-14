import { LayoutGrid } from "lucide-react";

interface CabecalhoEtapaProps {
  etapa: number;
  total: number;
  titulo: string;
  subtitulo: string;
}

export function CabecalhoEtapa({ etapa, total, titulo, subtitulo }: CabecalhoEtapaProps) {
  return (
    <div className="mb-7">
      <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-gray-400">
        <LayoutGrid className="h-3 w-3" />
        Etapa {etapa} de {total}
      </span>
      <h1 className="text-xl font-semibold tracking-tight text-gray-900">{titulo}</h1>
      <p className="mt-1 text-sm text-gray-500">{subtitulo}</p>
    </div>
  );
}
