import { Outlet } from "react-router-dom";
import { CustomSidebar } from "../ui/Sidebar";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import LogoIcon from "../../assets/logo-separado.svg?react";

export function DashboardLayout() {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="flex h-16 w-full items-center justify-between border-b bg-white px-4 text-white">
        <div className="flex items-center gap-4">
    
          {/* Logo centralizada ou à esquerda no Header */}
          <LogoIcon className="h-7 w-auto" />

          {/* Botão de abertura */}
          <button
            onClick={() => setAberto(!aberto)}
            className="rounded-lg p-2 hover:bg-white/10 transition-colors"
          >
            {!aberto && (<PanelLeftOpen className="h-18 text-primary-500"/>)}
            {aberto && (<PanelLeftClose className="h-18 text-primary-500"/>)}
          </button>
        </div>

        {/* Espaço para Perfil/Notificações no lado direito do Header */}
        <div className="flex items-center gap-4">
          {/* Componente de Usuário pode ir aqui também */}
        </div>
      </header>

      {/* CORPO DA PÁGINA */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR - Agora ela não tem mais o Header interno (opcional) */}
        {aberto && <CustomSidebar />}

        {/* CONTEÚDO */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
