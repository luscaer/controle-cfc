import { EtapaAutoEscola } from "./registro/EtapaAutoEscola";
import { EtapaUsuario } from "./registro/EtapaUsuario";
import { useRegistroForm } from "../hooks/useRegistro";

interface FormularioRegistroProps {
  etapa: number;
  setEtapa: React.Dispatch<React.SetStateAction<number>>;
}

export function FormularioRegistro({ etapa, setEtapa }: FormularioRegistroProps) {
  const {
    register, trigger, watch, setValue,
    formState: { errors, isSubmitting },
    handleSubmit, registrar,
    avancarEtapa, retrocederEtapa, onCancelar,
  } = useRegistroForm(etapa, setEtapa);

  return (
    <form onSubmit={handleSubmit(registrar)}>
      {etapa === 1 && (
        <EtapaAutoEscola
          register={register}
          erros={errors}
          onCancelar={onCancelar}
          onAvancar={avancarEtapa}
        />
      )}
      {etapa === 2 && (
        <EtapaUsuario
          register={register}
          trigger={trigger}
          erros={errors}
          watch={watch}
          setValue={setValue}
          isSubmitting={isSubmitting}
          onVoltar={retrocederEtapa}
        />
      )}
    </form>
  );
}
