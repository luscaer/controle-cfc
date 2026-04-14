// src/pages/Registro.tsx
import { AuthLayout } from "../components/layouts/AuthLayout";
import { StepIndicator } from "../components/ui/StepIndicator";
import { FormularioRegistro } from "./FormularioRegistro";
import { useState } from "react";

export function Registro() {
  const [etapa, setEtapa] = useState<number>(1);

  const registroAside = (
    <div className="flex flex-col gap-4">
      <StepIndicator
        numero={1}
        label="Dados da autoescola"
        ativa={etapa === 1}
        concluida={etapa > 1}
      />
      <div className="ml-[13px] h-5 w-px bg-white/20" />
      <StepIndicator
        numero={2}
        label="Dados do administrador"
        ativa={etapa === 2}
        concluida={false}
      />
    </div>
  );

  return (
    <AuthLayout aside={registroAside}>
      <FormularioRegistro etapa={etapa} setEtapa={setEtapa} />
    </AuthLayout>
  );
}
