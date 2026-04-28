import { useNavigate, useParams } from "react-router-dom";
import { useAutoEscola } from "../../hooks/useAutoEscola";
import { LoadingScreen } from "../../components/ui/LoadingScreen";
import { CustomButton } from "../../components/ui/Button";
import { CustomInput } from "../../components/ui/Input";
import { Check, ChevronRight, Pencil, Power, X } from "lucide-react";
import { aplicarMascaraCnpj } from "../../utils/formatters";
import { useState } from "react";
import { Spinner } from "../../components/ui/Spinner";

export function AutoEscolaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);

  const {
    autoEscola,
    isLoading,
    isSubmitting,
    handleUpdate,
    handleUpdateStatus,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useAutoEscola(id);

  if (isLoading) return <LoadingScreen></LoadingScreen>;
  if (!autoEscola) return <div>Auto escola não encontrada</div>;

  const iniciarEdicao = () => {
    reset({ nome: autoEscola.nome });
    setEditando(true);
  };

  const cancelarEdicao = () => {
    setEditando(false);
    reset();
  };

  const salvar = handleSubmit(async (dados) => {
    const sucesso = await handleUpdate(dados);
    if (sucesso) setEditando(false);
  });

  return (
    <div className="flex flex-col gap-10 p-6 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-1.5 text-xs text-gray-400">
        <button
          onClick={() => navigate("/auto-escolas")}
          className="hover:text-gray-600"
        >
          Autoescolas
        </button>
        <ChevronRight size={12} className="opacity-40" />
        <span className="text-gray-700">{autoEscola.nome}</span>
      </div>

      {/* Cabeçalho */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {autoEscola.nome}
          </h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-mono text-xs text-gray-400">
              {aplicarMascaraCnpj(autoEscola.cnpj)}
            </span>
            <BadgeStatus ativo={autoEscola.ativo} />
          </div>
        </div>

        <button
          onClick={handleUpdateStatus}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${
            autoEscola.ativo
              ? "border-red-200 text-red-600 hover:bg-red-50"
              : "border-green-200 text-green-700 hover:bg-green-50"
          }`}
        >
          <Power size={13} />
          {autoEscola.ativo ? "Inativar" : "Ativar"}
        </button>
      </div>

      {/* Grid de cards */}
      <div className="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {/* Dados cadastrais */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Dados cadastrais
            </h2>
            {!editando ? (
              <button
                onClick={iniciarEdicao}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-500 transition hover:bg-gray-50"
              >
                <Pencil size={12} /> Editar
              </button>
            ) : (
              <div className="flex gap-1.5">
                <button
                  onClick={cancelarEdicao}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-50"
                >
                  <X size={12} /> Cancelar
                </button>
                <button
                  onClick={salvar}
                  disabled={isSubmitting}
                  className="flex items-center gap-1 rounded-lg bg-[#1B62A5] px-2.5 py-1.5 text-xs text-white hover:bg-[#185490] disabled:opacity-60"
                >
                  {isSubmitting ? <Spinner size={12} /> : <Check size={12} />}
                  Salvar
                </button>
              </div>
            )}
          </div>

          {!editando ? (
            <div className="divide-y divide-gray-100">
              <InfoRow label="Nome" value={autoEscola.nome} />
              <InfoRow
                label="CNPJ"
                value={aplicarMascaraCnpj(autoEscola.cnpj)}
                mono
              />
              <InfoRow
                label="Cadastro"
                value={new Date(autoEscola.dataCriacao).toLocaleDateString(
                  "pt-BR",
                )}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Nome
                </label>
                <input
                  {...register("nome", { required: true })}
                  className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-[#1B62A5] focus:ring-2 focus:ring-[#1B62A5]/10"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  CNPJ
                </label>
                <input
                  value={aplicarMascaraCnpj(autoEscola.cnpj)}
                  readOnly
                  className="h-9 cursor-not-allowed rounded-lg border border-gray-100 bg-gray-50 px-3 font-mono text-xs text-gray-400 outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Informações do sistema */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
            Informações do sistema
          </h2>
          <div className="divide-y divide-gray-100">
            <InfoRow label="ID" value={autoEscola.id} mono truncate />
            <InfoRow
              label="Criado em"
              value={new Date(autoEscola.dataCriacao).toLocaleDateString(
                "pt-BR",
              )}
            />
            <InfoRow label="Criado por" value={autoEscola.usuarioCriador} />
            <InfoRow
              label="Ultima Atualização"
              value={
                autoEscola.dataAtualizacao
                  ? new Date(autoEscola.dataAtualizacao).toLocaleDateString(
                      "pt-BR",
                    )
                  : "Nunca Modificado"
              }
            />
            <InfoRow
              label="Modificado por"
              value={autoEscola.usuarioModificador}
            />
            <InfoRow label="Status">
              <BadgeStatus ativo={autoEscola.ativo} />
            </InfoRow>
          </div>
        </div>
      </div>
      {/* Zona de risco */}
      <div className="rounded-xl border border-red-100 bg-white p-5">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-red-500">
          Zona de risco
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">
              {autoEscola.ativo ? "Inativar autoescola" : "Ativar autoescola"}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              {autoEscola.ativo
                ? "A autoescola não poderá operar enquanto estiver inativa."
                : "A autoescola voltará a operar normalmente."}
            </p>
          </div>
          <button
            onClick={handleUpdateStatus}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${
              autoEscola.ativo
                ? "border-red-200 text-red-600 hover:bg-red-50"
                : "border-green-200 text-green-700 hover:bg-green-50"
            }`}
          >
            <Power size={13} />
            {autoEscola.ativo ? "Inativar autoescola" : "Ativar autoescola"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BadgeStatus({ ativo }: { ativo: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${ativo ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-500"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${ativo ? "bg-green-500" : "bg-gray-400"}`}
      />
      {ativo ? "Ativa" : "Inativa"}
    </span>
  );
}

interface InfoRowProps {
  label: string;
  value?: string;
  mono?: boolean;
  truncate?: boolean;
  children?: React.ReactNode;
}

function InfoRow({ label, value, mono, truncate, children }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between py-2.5 text-sm">
      <span className="text-gray-400">{label}</span>
      {children ?? (
        <span
          className={`font-medium text-gray-800 ${mono ? "font-mono text-xs" : ""} ${truncate ? "max-w-[180px] truncate" : ""}`}
        >
          {value}
        </span>
      )}
    </div>
  );
}
