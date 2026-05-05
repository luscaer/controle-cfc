import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { CustomButton } from "../ui/Button";

export function LinkRecuperacaoInvalido() {
  const navigate = useNavigate();

  const abrirSuporte = () => {
    const phone = import.meta.env.VITE_SUPPORT_PHONE;
    const mensagem =
      "Olá! Estou com dificuldades para acessar a minha conta no Controle CFC e preciso de suporte.";

    const textoFormatado = encodeURIComponent(mensagem);

    window.open(`https://wa.me/${phone}?text=${textoFormatado}`, "_blank");
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-5 rounded-xl border border-gray-200 bg-white px-10 py-9 text-center mt-8">
      {/* Ícone */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-200 bg-red-50">
        <AlertCircle size={20} className="text-red-700" />
      </div>

      {/* Texto */}
      <div className="flex flex-col gap-1.5">
        <p className="text-base font-medium text-gray-900">
          Link inválido ou expirado
        </p>
        <p className="text-sm leading-relaxed text-gray-500">
          O link de redefinição de senha é inválido, já foi utilizado ou
          expirou. Links são válidos por apenas 15 minutos.
        </p>
      </div>

      <div className="w-full border-t border-gray-100" />

      {/* Ações */}
      <div className="flex w-full flex-col gap-2">
        <CustomButton onClick={() => navigate("/esqueci-senha")}>
          Solicitar novo link
        </CustomButton>
        <CustomButton
          variant="secondary"
          onClick={() => navigate("/login")}
          className="border border-gray-200 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50"
        >
          Voltar ao login
        </CustomButton>
      </div>

      <p className="text-xs text-gray-400">
        Ainda com problemas?{" "}
        <span
          onClick={abrirSuporte}
          className="cursor-pointer text-primary-500 hover:underline"
        >
          Fale com o suporte
        </span>
      </p>
    </div>
  );
}
