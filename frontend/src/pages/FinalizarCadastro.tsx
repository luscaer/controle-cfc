import { useSearchParams } from "react-router-dom";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { StepIndicator } from "../components/ui/StepIndicator";
import { useRegistroForm } from "../hooks/useRegistro";
import { FormularioRegistro } from "./FormularioRegistro";
import { LinkRegistroInvalido } from "../components/layouts/LinkRegistroInvalido";
import { useEffect } from "react";
import { validarTokenEmail } from "../api/registroApi";
import { toast } from "sonner";

export function FinalizarCadastro() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || undefined;

  const registro = useRegistroForm(token);

  useEffect(() => {
    const carregarEmail = async () => {
      try {
        const email = await validarTokenEmail(token);
        registro.setValue("email", email);
        registro.setValue("perfilUsuario", "ADMINISTRADOR");
      } catch {
        toast.error("Link de convite inválido ou expirado.");
      }
    };
    carregarEmail();
  }, [token, registro]);

  if (!token)
    return (
      <AuthLayout>
        <LinkRegistroInvalido></LinkRegistroInvalido>
      </AuthLayout>
    );

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
      <FormularioRegistro form={registro} isConvite={true} />
    </AuthLayout>
  );
}
