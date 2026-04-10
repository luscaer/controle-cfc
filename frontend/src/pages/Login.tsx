import LogoIcon from "../assets/logo-separado-branco.svg?react";
import { FormularioLogin } from "./FormularioLogin";

export function Login() {
  return (
    <div className="flex min-h-screen">

      {/* Painel esquerdo — identidade visual */}
      <div className="relative hidden lg:flex w-1/2 flex-col justify-between bg-[#1B62A5] p-10 overflow-hidden">

        {/* Círculos decorativos de fundo */}
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full border-[40px] border-white/5" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border-[30px] border-white/[0.04]" />

        {/* Logo */}
        <div className="relative z-10">
          <LogoIcon className="h-10 w-1/4"/>
        </div>

        {/* Tagline */}
        <div className="relative z-10">
          <p className="text-2xl font-semibold leading-snug tracking-tight text-white mb-2">
            Gestão inteligente para sua autoescola
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            Controle alunos, aulas e processos em um só lugar,
            com agilidade e segurança.
          </p>
        </div>

        {/* Badge de status */}
        <div className="relative z-10 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          <span className="text-xs text-white/75">Sistema online e operacional</span>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">

          {/* Cabeçalho do form */}
          <div className="mb-8">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Bem-vindo de volta
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Acesse sua conta para continuar
            </p>
          </div>

          {/* Formulário — seu componente existente */}
          <FormularioLogin />

          {/* Rodapé */}
          <div className="mt-6 text-center text-xs text-gray-400">
            Problemas para acessar?{" "}
            <a href="#" className="text-[#1B62A5] hover:underline">
              Fale com o suporte
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}