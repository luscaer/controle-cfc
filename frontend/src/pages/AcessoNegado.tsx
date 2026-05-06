import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CustomButton } from "../components/ui/Button";

export function AcessoNegado() {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#eef0f3] px-6 py-16">
        {/* Grid de fundo */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
            linear-gradient(rgb(0 0 0 / 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgb(0 0 0 / 0.12) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Fades nas bordas para dissolver o grid */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#eef0f3] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#eef0f3] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#eef0f3] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#eef0f3] to-transparent" />

        {/* Card central */}
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white px-10 py-9">
          <div className="flex flex-col items-center -mb-4">
            {/* Semáforo */}
            <motion.div
              animate={{ rotateZ: [-5, 5, -5] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "top center" }}
              className="flex flex-col items-center"
            >
              <div className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-neutral-800 bg-[#1c1c1e] px-2.5 py-2.5">
                {/* Luz vermelha do semáforo */}
                <motion.div
                  animate={{
                    opacity: [1, 0.8, 1],
                    boxShadow: [
                      "0 0 0px rgba(239, 68, 68, 0)",
                      "0 0 40px rgba(239, 68, 68, 0.9)",
                      "0 0 0px rgba(239, 68, 68, 0)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-8 w-8 rounded-full border-2 border-black bg-red-500"
                />
                <div className="h-8 w-8 rounded-full border-2 border-black bg-neutral-800" />
                <div className="h-8 w-8 rounded-full border-2 border-black bg-neutral-800" />
              </div>
              <div className="h-9 w-1.5 rounded-full bg-gray-400" />
              <div className="h-2 w-12 rounded-full bg-gray-400" />
            </motion.div>
            {/* Sombra Dinâmica */}
            
          </div>

          {/* Texto */}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-red-700">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Acesso restrito
            </span>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Pare! Acesso negado.
            </h1>
            <p className="text-sm leading-relaxed text-gray-500">
              Você não tem permissão para acessar esta página. Entre em contato
              com o administrador se acredita que isso é um erro.
            </p>
          </div>

          <div className="w-full border-t border-gray-100" />

          {/* Botão */}
          <CustomButton
            onClick={() => navigate("/")}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 py-2.5 text-sm font-medium text-white transition hover:bg-[#185490] active:scale-[0.98]"
          >
            <ArrowLeft size={14} />
            Voltar ao início
          </CustomButton>

          {/* Código do erro */}
          <p className="font-mono text-[11px] text-gray-300">
            erro 403 — forbidden
          </p>
        </div>
      </div>
    </AnimatePresence>
  );
}
