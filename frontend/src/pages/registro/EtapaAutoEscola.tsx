import { ArrowRight, Building, User } from "lucide-react";
import { CabecalhoEtapa } from "../../components/ui/CabecalhoEtapa";
import { CustomInput } from "../../components/ui/Input";
import { CustomButton } from "../../components/ui/Button";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegisterFormData } from "../../schemas/registerSchema";
import { aplicarMascaraCnpj } from "../../utils/formatters";

interface EtapaAutoEscolaProps {
  register: UseFormRegister<RegisterFormData>;
  erros: FieldErrors<RegisterFormData>;
  onCancelar: () => void;
  onAvancar: () => void;
}

export function EtapaAutoEscola({
  register,
  erros,
  onCancelar,
  onAvancar,
}: EtapaAutoEscolaProps) {
  return (
    <div className="flex flex-col gap-4">
      <CabecalhoEtapa
        etapa={1}
        total={2}
        titulo="Cadastro da AutoEscola"
        subtitulo="Informa os dados da sua instituição"
      />

      {/* Nome */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="nome-autoescola"
        >
          Nome
        </label>
        <div className="relative flex items-center">
          <User className="absolute left-3 h-4 w-4 text-gray-400" />
          <CustomInput
            type="text"
            id="nome-autoescola"
            placeholder="Auto Escola Exemplo"
            className="pl-9"
            {...register("nomeAutoEscola")}
            hasError={!!erros.nomeAutoEscola}
          />
        </div>
        {erros.nomeAutoEscola && (
          <p className="text-xs text-red-600">{erros.nomeAutoEscola.message}</p>
        )}
      </div>

      {/* CNPJ */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="cnpj"
        >
          CNPJ
        </label>
        <div className="relative flex items-center">
          <Building className="absolute left-3 h-4 w-4 text-gray-400" />
          <CustomInput
            type="text"
            id="cnpj"
            placeholder="00.000.000/0000-00"
            className="pl-9"
            hasError={!!erros.cnpj}
            {...register("cnpj", {
              onChange: (evento) => {
                evento.target.value = aplicarMascaraCnpj(evento.target.value);
              },
            })}
          />
        </div>
        {erros.cnpj && (
          <p className="text-xs text-red-600">{erros.cnpj.message}</p>
        )}
      </div>

      <div className="flex gap-2 mt-1">
        <CustomButton
          variant="ghost"
          size="md"
          onClick={onCancelar}
          type="button"
        >
          Cancelar
        </CustomButton>
        <CustomButton
          variant="primary"
          size="md"
          onClick={onAvancar}
          className="flex-1"
        >
          Próximo
          <ArrowRight className="ml-2 h-4 w-4" />
        </CustomButton>
      </div>
    </div>
  );
}
