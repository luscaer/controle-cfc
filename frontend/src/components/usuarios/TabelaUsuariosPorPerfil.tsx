import type { UsuarioResumedResponse } from "../../types/usuario-response";
import { aplicarMascaraTelefone } from "../../utils/formatters";

interface TabelaUsuariosPorPerfilProps {
  usuarios: UsuarioResumedResponse[];
}

export function TabelaUsuariosPorPefil({ usuarios }: TabelaUsuariosPorPerfilProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse md:min-w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Nome
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400">
                E-mail
              </th>
              <th className="hidden px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400 sm:table-cell">
                Telefone
              </th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {user.nome}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">
                  {user.email}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">
                  {aplicarMascaraTelefone(user.telefone)}
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <BadgeStatus ativo={user.ativo} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BadgeStatus({ ativo }: { ativo: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
        ativo ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${ativo ? "bg-green-500" : "bg-gray-400"}`}
      />
      {ativo ? "Ativo" : "Inativo"}
    </span>
  );
}
