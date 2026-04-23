import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppHeader } from "../ui/AppHeader";
import { CustomSidebar } from "../ui/Sidebar";

export function DashboardLayout() {
  const [sidebarAberta, setSidebarAberta] = useState(
    () => window.innerWidth >= 1024,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = (evento: MediaQueryListEvent) => {
      setSidebarAberta(evento.matches);
    };
    mediaQuery.addEventListener("resize", handleResize);
    return () => mediaQuery.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <AppHeader
        sidebarAberta={sidebarAberta}
        onToggleSidebar={() => setSidebarAberta((v) => !v)}
      />

      {/* CORPO DA PÁGINA */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Overlay mobile */}
        {sidebarAberta && (
          <div
            className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden transition-opacity"
            onClick={() => setSidebarAberta(false)}
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`
            absolute inset-y-0 left-0 z-50 flex h-full transform transition-all duration-300
            lg:relative lg:translate-x-0 lg:overflow-hidden
            ${sidebarAberta ? "translate-x-0 lg:w-80" : "-translate-x-full lg:w-0"}
          `}
        >
          <CustomSidebar
            onCloseMobile={() => {
              if (window.innerWidth < 1024) setSidebarAberta(false);
            }}
          />
        </div>

        {/* CONTEÚDO */}
        <main className="flex-1 w-full overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
