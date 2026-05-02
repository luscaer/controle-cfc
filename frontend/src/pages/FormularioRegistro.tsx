import type { useRegistroForm } from "../hooks/useRegistro";
import { EtapaAutoEscola } from "./registro/EtapaAutoEscola";
import { EtapaUsuario } from "./registro/EtapaUsuario";

type HookRegistro = ReturnType<typeof useRegistroForm>;
interface FormularioRegistroProps {
  form: HookRegistro;
}

export function FormularioRegistro({ form }: FormularioRegistroProps) {
  const {
    etapa,
    register,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
    registrar,
    avancarEtapa,
    retrocederEtapa,
    onCancelar
  } = form;

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
