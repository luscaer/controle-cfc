import { AuthLayout } from "../components/layouts/AuthLayout";
import { FormularioLogin } from "./FormularioLogin";

export function Login() {
  return (
    <AuthLayout>
          {/* Cabeçalho do form */}
          <div className="mb-8">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Bem-vindo de volta
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Acesse sua conta para continuar
            </p>
          </div>

          {/* Formulário */}
          <FormularioLogin />

          {/* Rodapé */}
          <div className="mt-6 text-center text-xs text-gray-400">
            Problemas para acessar?{" "}
            <a href="#" className="text-[#1B62A5] hover:underline">
              Fale com o suporte
            </a>
          </div>
    </AuthLayout>
  );
}