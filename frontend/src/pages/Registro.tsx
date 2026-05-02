// src/pages/Registro.tsx
import { AuthLayout } from "../components/layouts/AuthLayout";
import { StepIndicator } from "../components/ui/StepIndicator";
import { useRegistroForm } from "../hooks/useRegistro";
import { FormularioRegistro } from "./FormularioRegistro";

export function Registro() {
  const registro =  useRegistroForm();

  const registroAside = (
    <div className="flex flex-col gap-4">
      <StepIndicator
        numero={1}
        label="Dados da autoescola"
        ativa={registro.etapa === 1}
        concluida={registro.etapa > 1}
      />
      <div className="ml-[13px] h-5 w-px bg-white/20" />
      <StepIndicator
        numero={2}
        label="Dados do administrador"
        ativa={registro.etapa === 2}
        concluida={false}
      />
    </div>
  );

  return (
    <AuthLayout aside={registroAside}>
      <FormularioRegistro form={registro} />
    </AuthLayout>
  );
}
