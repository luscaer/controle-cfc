import { ArrowLeft } from "lucide-react";
import { CustomButton } from "../components/ui/Button";
import { FormularioEsqueciSenha } from "./redefinirSenha/FormularioEsqueciSenha";
import { useNavigate } from "react-router-dom";

export function EsqueciSenha() {
  const navigate = useNavigate();

  return (
    <>
      {/* Cabeçalho do form */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">
          Recuperar Senha
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Digite seu e-mail e enviaremos um link de acesso
        </p>
      </div>

      {/* Formulário */}
      <FormularioEsqueciSenha />

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
