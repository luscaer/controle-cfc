import { ShieldCheck, User } from "lucide-react";
import type { PerfilSelecao } from "../../types/perfil-usuario";

interface PerfilSelectorProps {
    value: PerfilSelecao;
    onChange: (perfil: PerfilSelecao) => void;
}

const opcoes: { value: PerfilSelecao; label: string; descricao: string; icon: React.ReactNode }[] = [
  {
    value: "INSTRUTOR",
    label: "Instrutor",
    descricao: "Acesso operacional",
    icon: <User className="h-4 w-4" />,
  },
  {
    value: "ADMINISTRADOR",
    label: "Administrador",
    descricao: "Acesso total",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
];

export function PerfilSelector({ value, onChange }: PerfilSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {opcoes.map((opcao) => {
        const selecionado = value === opcao.value;
        return (
          <button
            key={opcao.value}
            type="button"                          
            onClick={() => onChange(opcao.value)}
            className={`
              flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left
              transition-all
              ${selecionado
                ? "border-primary-500 bg-blue-50 text-primary-500"
                : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
              }
            `}
          >
            {opcao.icon}
            <div>
              <p className="text-xs font-medium text-gray-900">{opcao.label}</p>
              <p className="text-[11px] text-gray-400">{opcao.descricao}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
