import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";

export function AcessoNegado() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white px-6 py-16">
      {/* Mascote — semáforo */}
      <div
        className="flex flex-col items-center animate-[sway_3s_ease-in-out_infinite]"
        style={{ transformOrigin: "top center" }}
      >
        <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-neutral-700 bg-neutral-900 px-3 py-3">
          {/* Vermelho — piscando */}
          <div className="h-9 w-9 rounded-full border-2 border-neutral-950 bg-red-500 animate-pulse" />
          {/* Amarelo — apagado */}
          <div className="h-9 w-9 rounded-full border-2 border-neutral-950 bg-neutral-800" />
          {/* Verde — apagado */}
          <div className="h-9 w-9 rounded-full border-2 border-neutral-950 bg-neutral-800" />
        </div>
        {/* Haste */}
        <div className="h-12 w-1.5 rounded-full bg-neutral-500" />
        {/* Base */}
        <div className="h-2.5 w-14 rounded-full bg-neutral-500" />
      </div>

      {/* Texto */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-red-700">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          Acesso restrito
        </span>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
          Pare! Acesso negado.
        </h1>
        <p className="max-w-xs text-sm leading-relaxed text-gray-500">
          Você não tem permissão para acessar esta página. Entre em contato com
          o administrador se acredita que isso é um erro.
        </p>
      </div>

      {/* Botão */}
      <CustomButton onClick={() => navigate("/")}>
        <ArrowLeft className="h-4 w-4 text-gray-400" />
        Voltar ao início
      </CustomButton>
    </div>
  );
}
