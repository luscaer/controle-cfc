import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAutoEscolas } from "../../hooks/useAutoEscolas";
import { LoadingScreen } from "../../components/ui/LoadingScreen";
import { TabelaAutoEscolas } from "../../components/autoescolas/TabelaAutoEscolas";
import { BarraBusca } from "../../components/autoescolas/BarraBusca";
import LogoIcon from "../../assets/logo.svg?react";
import { CustomButton } from "../../components/ui/Button";
import { useState } from "react";
import {
  ConviteSchema,
  type ConviteFormData,
} from "../../schemas/conviteSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { conviteRegistro } from "../../api/registroApi";
import { toast } from "sonner";
import { ModalConvite } from "../../components/ui/ModalConvite";

const ITENS_POR_PAGINA = 10;

export function AutoEscolasDashboard() {
  const navigate = useNavigate();
  const [modalConviteAberto, setModalConviteAberto] = useState(false);

  const {
    autoEscolas,
    paginaAtual,
    totalElementos,
    isLoading,
    busca,
    setBusca,
    setPaginaAtual,
  } = useAutoEscolas();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConviteFormData>({
    resolver: zodResolver(ConviteSchema),
    mode: "onTouched"
  });

  const onSubmit = async (data: ConviteFormData) => {
    try {
      await conviteRegistro(data);
      toast.success("Convite enviado com sucesso!");
      reset();
      setModalConviteAberto(false);
    } catch (error) {
      toast.error("Falha ao enviar convite.");
    }
  };

  if (isLoading)
    return (
      <LoadingScreen logo={<LogoIcon className="h-full w-full text-white" />} />
    );

  return (
    <div className="p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Autoescolas</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Gerencie todas as autoescolas cadastradas no sistema
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <CustomButton
            variant="secondary"
            onClick={() => setModalConviteAberto(true)}
          >
            <Plus size={14} />
            Convidar
          </CustomButton>
          <CustomButton onClick={() => navigate("/registro")}>
            <Plus size={14} />
            Nova autoescola
          </CustomButton>
        </div>
      </div>

      <BarraBusca
        busca={busca}
        onChange={setBusca}
        total={totalElementos}
        exibindo={autoEscolas.length}
      />

      <TabelaAutoEscolas
        autoEscolas={autoEscolas}
        busca={busca}
        paginaAtual={paginaAtual}
        totalElementos={totalElementos}
        itensPorPagina={ITENS_POR_PAGINA}
        onDetalhe={(id) => navigate(`/auto-escolas/${id}`)}
        onPaginaChange={setPaginaAtual}
      />

      <ModalConvite
        isOpen={modalConviteAberto}
        onClose={() => setModalConviteAberto(false)}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      ></ModalConvite>
    </div>
  );
}
