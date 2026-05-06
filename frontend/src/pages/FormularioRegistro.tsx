import type { useRegistroForm } from "../hooks/useRegistro";
import { EtapaAutoEscola } from "../components/registro/EtapaAutoEscola";
import { EtapaUsuario } from "../components/registro/EtapaUsuario";
import { AnimatePresence, motion } from "framer-motion";
import { SPRING_SLIDE, VARIANTS_SIDE_SLIDE } from "../styles/animation";
import { useState } from "react";

type HookRegistro = ReturnType<typeof useRegistroForm>;
interface FormularioRegistroProps {
  form: HookRegistro;
  isConvite?: boolean;
}

export function FormularioRegistro({
  form,
  isConvite,
}: FormularioRegistroProps) {
  const {
    etapa,
    register,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
    handleSubmit,
    registrar,
    avancarEtapa,
    retrocederEtapa,
    onCancelar,
  } = form;

  const [direcao, setDirecao] = useState(1);
  const [etapaAnterior, setEtapaAnterior] = useState(etapa);
  if (etapa !== etapaAnterior) {
    setDirecao(etapa > etapaAnterior ? 1 : -1);
    setEtapaAnterior(etapa);
  }

  return (
    <form onSubmit={handleSubmit(registrar)}>
      <AnimatePresence mode="wait" custom={direcao}>
        {etapa === 1 && (
          <motion.div
            key="etapa1"
            custom={direcao}
            variants={VARIANTS_SIDE_SLIDE}
            initial="entrada"
            animate="centro"
            exit="saida"
            transition={SPRING_SLIDE}
          >
            <EtapaAutoEscola
              register={register}
              erros={errors}
              onCancelar={onCancelar}
              onAvancar={avancarEtapa}
            />
          </motion.div>
        )}
        {etapa === 2 && (
          <motion.div
            key="etapa2"
            custom={direcao}
            variants={VARIANTS_SIDE_SLIDE}
            initial="entrada"
            animate="centro"
            exit="saida"
            transition={SPRING_SLIDE}
          >
            <EtapaUsuario
              register={register}
              trigger={trigger}
              erros={errors}
              watch={watch}
              setValue={setValue}
              isSubmitting={isSubmitting}
              onVoltar={retrocederEtapa}
              isConvite={isConvite}
              isSubmitted={isSubmitted}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
