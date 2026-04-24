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
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setAberto(!aberto)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 transition-all hover:border-gray-200 hover:bg-gray-50"
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-blue-300 bg-blue-100 text-[11px] font-semibold text-blue-800">
          {iniciais}
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-medium text-gray-900">{nome}</p>
          <p className="text-[11px] text-gray-500">{perfil}</p>
        </div>
        <span
          className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400"
          title="Online"
        />
        <svg
          className={`h-3 w-3 text-gray-400 transition-transform ${aberto ? "rotate-180" : ""}`}
          viewBox="0 0 13 13"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M3 5l3.5 3.5L10 5" />
        </svg>
      </div>
 
      {/* Dropdown Menu */}
      {aberto && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-gray-100 bg-white p-1 shadow-xl ring-1 ring-black ring-opacity-5 z-50">
          <div className="px-3 py-2 border-b border-gray-50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Opções</p>
          </div>
          
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary-500">
            <UserCog size={14} />
            Meus Dados
          </button>
 
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary-500">
            <Building size={14} />
            Dados da Autoescola
          </button>
 
          <div className="my-1 border-t border-gray-50" />
 
          <button 
            onClick={() => logout()}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={14} />
            Sair da Conta
          </button>
        </div>
      )}
    </div>
  );
}