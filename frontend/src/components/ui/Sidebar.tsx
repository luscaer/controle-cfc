import {
  Building2,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  Users,
  type LucideIcon,
} from "lucide-react";
import LogoIcon from "../../assets/logo-separado-branco.svg?react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { extrairIniciaisNome } from "../../utils/formatters";
interface NavigationLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigationLinks: NavigationLink[] = [
  { name: "Menu Inicial", href: "/", icon: LayoutDashboard },
  { name: "Auto Escola", href: "/autoescolas", icon: Building2 },
  { name: "Usuário", href: "/usuarios", icon: Users },
];

export function CustomSidebar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  if (!usuario) return null;

  const submeterLogout = async (evento: React.MouseEvent) => {
    evento.preventDefault();
    const sucesso = await logout();

    if (sucesso) navigate("/login");
  };

  const iniciais = extrairIniciaisNome(usuario.nome);

  return (
    <aside className="flex h-full w-80 flex-col bg-primary-500 text-white">

      {/* Navegação */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
        <p className="mb-1 px-3 pt-1 text-[10px] font-medium uppercase tracking-widest text-white/40">
          Navegação
        </p>

        {navigationLinks.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            end={link.href === "/"}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-white/20 font-medium text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white/90"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon size={17} />
                <span className="flex-1">{link.name}</span>
                {isActive && (
                  <span className="h-4 w-0.5 rounded-full bg-white" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer — usuário + logout */}
      <div className="flex-none border-t border-white/10 p-3">
        {/* Card do usuário */}
        <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/20 text-xs font-semibold">
            {iniciais}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white">
              {usuario.nome}
            </p>
            <p className="text-[11px] text-white/55">{usuario.perfilUsuario}</p>
          </div>
          <span
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400"
            title="Online"
          />
        </div>

        {/* Botão de logout */}
        <button
          onClick={submeterLogout}
          className="mt-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white/90"
        >
          <LogOut size={14} />
          Sair da conta
        </button>
      </div>
    </aside>
  );
}
