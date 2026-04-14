import type { ReactNode } from "react";
import LogoIcon from "../../assets/logo-separado-branco.svg?react";

interface AuthLayoutProps {
  children: ReactNode;
  aside?: ReactNode;
}

export function AuthLayout({ children, aside }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden lg:flex w-1/2 flex-col justify-between bg-primary-500 p-10 overflow-hidden">
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full border-[40px] border-white/5" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border-[30px] border-white/4" />

        {/* Logo */}
        <div className="relative z-10">
          <LogoIcon className="h-10 w-1/4" />
        </div>

        {/* Aside */}
        <div className="relative z-10">{aside ?? <DefaultAside />}</div>

        {/* Rodapé */}
        <div className="flex items-center justify-between gap-4">
          <p className="relative z-10 text-xs text-white/40">
            Controle CFC &copy; 2025 — Todos os direitos reservados
          </p>

          <div className="flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            <span className="text-xs text-white/75">
              Sistema online e operacional
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}

function DefaultAside() {
  return (
    <>
      <p className="text-2xl font-semibold leading-snug tracking-tight text-white mb-2">
        Gestão inteligente para sua autoescola
      </p>
      <p className="text-sm text-white/60 leading-relaxed">
        Controle alunos, aulas e processos em um só lugar, com agilidade e
        segurança.
      </p>
    </>
  );
}
