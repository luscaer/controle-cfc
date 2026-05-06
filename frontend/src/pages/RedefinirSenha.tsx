import { ArrowLeft } from "lucide-react";
import { CustomButton } from "../components/ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormularioRedefinirSenha } from "./redefinirSenha/FormularioRedefinirSenha";
import { LinkRecuperacaoInvalido } from "../components/layouts/LinkRecuperacaoInvalido";

export function RedefinirSenha() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token)
    return (
        <LinkRecuperacaoInvalido />
    );

  return (
    <>
      {/* Cabeçalho do form */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">
          Redefinir Senha
        </h1>
        <p className="mt-1 text-sm text-gray-500">Digite sua nova senha</p>
      </div>

      {/* Formulário */}
      <FormularioRedefinirSenha token={token} />

      {/* Rodapé */}
      <div className="mt-2">
        <CustomButton
          variant="secondary"
          size="md"
          type="button"
          className="w-full justify-center"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o login
        </CustomButton>
      </div>
    </>
  );
}
