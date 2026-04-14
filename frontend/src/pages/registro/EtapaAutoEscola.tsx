import { ArrowRight, Building, User } from "lucide-react";
import { CabecalhoEtapa } from "../../components/ui/CabecalhoEtapa";
import type { RegistroFormsErrors } from "../../types/registro-form-errors";
import { CustomInput } from "../../components/ui/Input";
import type { AutoEscolaRequest } from "../../types/autoescola-request";
import { CustomButton } from "../../components/ui/Button";
import { aplicarMascaraCnpj } from "../../utils/formatters";

interface EtapaAutoEscolaProps {
  dados: AutoEscolaRequest;
  erros: RegistroFormsErrors;
  onChange: (dados: AutoEscolaRequest) => void;
  onBlur: (campo: keyof RegistroFormsErrors, valor: string) => void;
  onAvancar: () => void;
}

export function EtapaAutoEscola({
  dados,
  erros,
  onChange,
  onBlur,
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
            value={dados.nome}
            onChange={(e) => onChange({ ...dados, nome: e.target.value })}
            onBlur={(e) => onBlur("nomeAutoEscola", e.target.value)}
            hasError={erros.nomeAutoEscola !== ""}
          />
        </div>
        {erros.nomeAutoEscola && (
          <p className="text-xs text-red-600">{erros.nomeAutoEscola}</p>
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
            value={dados.cnpj}
            onChange={(e) => {
              const cnpjFormatado = aplicarMascaraCnpj(e.target.value);
              onChange({ ...dados, cnpj: cnpjFormatado });
            }}
            onBlur={(e) => onBlur("cnpj", e.target.value)}
            hasError={erros.cnpj !== ""}
          />
        </div>
        {erros.cnpj && <p className="text-xs text-red-600">{erros.cnpj}</p>}
      </div>

      <CustomButton variant="primary" size="md" onClick={onAvancar}>
        Próximo
        <ArrowRight className="ml-2 h-4 w-4" />
      </CustomButton>
    </div>
  );
}
