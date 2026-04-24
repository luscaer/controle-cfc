import { Bell, PanelLeftClose, PanelLeftOpen, UserCog, Building, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import LogoIcon from "../../assets/logo.svg?react";
import { useAuth } from "../../context/AuthContext";
import { extrairIniciaisNome } from "../../utils/formatters";

interface AppHeaderProps {
  sidebarAberta: boolean;
  onToggleSidebar: () => void;
}

export function AppHeader({ sidebarAberta, onToggleSidebar }: AppHeaderProps) {
  const { usuario } = useAuth();
  if (!usuario) return null;

  const iniciais = extrairIniciaisNome(usuario.nome);

  return (
    <header className="flex h-14 w-full flex-none items-center justify-between border-b border-gray-200 bg-white px-4">

      {/* Lado esquerdo — logo + toggle + breadcrumb */}
      <div className="flex items-center gap-2.5">
        <LogoIcon className="h-6 w-auto text-primary-500" />

        <button
          onClick={onToggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-500 transition-colors hover:bg-primary-500/10"
          title={sidebarAberta ? "Fechar menu" : "Abrir menu"}
        >
          {sidebarAberta
            ? <PanelLeftClose size={18} />
            : <PanelLeftOpen  size={18} />
          }
        </button>

        <div className="hidden sm:block h-5 w-px bg-gray-200" />

        {/* Breadcrumb — pode virar prop futuramente */}
        <div className="hidden sm:block">
          <Breadcrumb />
        </div>
      </div>

      {/* Lado direito — notificações + usuário */}
      <div className="flex items-center gap-2">

        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100">
          <Bell size={17} />
          {/* Remova esse span quando não houver notificações */}
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full border border-white bg-red-500" />
        </button>

        <div className="h-5 w-px bg-gray-200" />

        <UserCard iniciais={iniciais} nome={usuario.nome} perfil={usuario.perfilUsuario} />
      </div>

    </header>
  );
}

function Breadcrumb() {
  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-400">
      <span>Início</span>
      <svg className="h-3 w-3" viewBox="0 0 13 13" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 2l5 4.5L4 11" />
      </svg>
      <span className="font-medium text-gray-800">Dashboard</span>
    </div>
  );
}

interface UserCardProps {
  iniciais: string;
  nome: string;
  perfil: string;
}

function UserCard({ iniciais, nome, perfil }: UserCardProps) {
  const [aberto, setAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>

      {/* Trigger */}
      <button
        onClick={() => setAberto((v) => !v)}
        className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 transition-all ${
          aberto
            ? "border-gray-200 bg-gray-50"
            : "border-transparent hover:border-gray-200 hover:bg-gray-50"
        }`}
      >
        {/* Avatar */}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#85B7EB] bg-[#B5D4F4] text-[11px] font-medium leading-none text-[#0C447C]">
          {iniciais}
        </div>

        {/* Info */}
        <div className="hidden flex-col sm:flex">
          <span className="text-xs font-medium leading-[1.3] text-gray-900">{nome}</span>
          <span className="text-[11px] leading-[1.3] text-gray-500">{perfil}</span>
        </div>

        {/* Online dot */}
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />

        {/* Chevron */}
        <svg
          className={`h-3 w-3 shrink-0 text-gray-400 transition-transform ${aberto ? "rotate-180" : ""}`}
          viewBox="0 0 12 12" fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown */}
      {aberto && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-52 rounded-xl border border-gray-100 bg-white p-1 shadow-lg">

          {/* Cabeçalho do dropdown */}
          <div className="border-b border-gray-100 px-2.5 py-2 mb-1">
            <p className="text-xs font-medium text-gray-900">{nome}</p>
            <p className="text-[11px] text-gray-500">{perfil}</p>
          </div>

          <MenuItem icon={<UserCog size={14} />}>Meus dados</MenuItem>
          <MenuItem icon={<Building size={14} />}>Dados da autoescola</MenuItem>

          <div className="my-1 border-t border-gray-100" />

          <MenuItem
            icon={<LogOut size={14} />}
            onClick={() => logout()}
            variant="danger"
          >
            Sair da conta
          </MenuItem>
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger";
}

function MenuItem({ icon, children, onClick, variant = "default" }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
        variant === "danger"
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
