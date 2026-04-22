import { Building2, LogOut, Users, type LucideIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { PerfilUsuario } from "../../types/perfil-usuario";
interface NavigationLink {
  name: string;
  href: string;
  icon: LucideIcon;
  perfis?: PerfilUsuario[];
}

const navigationLinks: NavigationLink[] = [
  {
    name: "Auto Escola",
    href: "/auto-escolas",
    icon: Building2,
    perfis: ["SUPER_ADMIN"],
  },
  { name: "Usuário", href: "/usuarios", icon: Users, perfis:["ADMINISTRADOR"] },
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

  const userHasPermission = (linkPerfil: PerfilUsuario[] | undefined) => {
    const perfilDoUsuario = usuario.perfilUsuario;

    if (!linkPerfil) return true;

    return linkPerfil.includes(perfilDoUsuario);
  };

  return (
    <aside className="flex h-full w-80 flex-col bg-primary-500 text-white">
      {/* Navegação */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
        <p className="mb-1 px-3 pt-1 text-[10px] font-medium uppercase tracking-widest text-white/40">
          Navegação
        </p>

        {navigationLinks
          .filter((link) => {
            return userHasPermission(link.perfis);
          })
          .map((link) => (
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

      {/* Footer — logout */}
      <div className="flex-none border-t border-white/10 p-3">
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
