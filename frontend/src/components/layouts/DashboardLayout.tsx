import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AppHeader } from "../ui/AppHeader";
import { CustomSidebar } from "../ui/Sidebar";

export function DashboardLayout() {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <AppHeader
        sidebarAberta={sidebarAberta}
        onToggleSidebar={() => setSidebarAberta(v => !v)}
      ></AppHeader>

      {/* CORPO DA PÁGINA */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR - Agora ela não tem mais o Header interno (opcional) */}
        {sidebarAberta && <CustomSidebar />}

        {/* CONTEÚDO */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
