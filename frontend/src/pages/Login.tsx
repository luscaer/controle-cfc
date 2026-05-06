import { FormularioLogin } from "./FormularioLogin";

export function Login() {
  const abrirSuporte = () => {
    const phone = import.meta.env.VITE_SUPPORT_PHONE;
    const mensagem =
      "Olá! Estou com dificuldades para acessar a minha conta no Controle CFC e preciso de suporte.";

    const textoFormatado = encodeURIComponent(mensagem);

    window.open(`https://wa.me/${phone}?text=${textoFormatado}`, "_blank");
  };

  return (
    <>
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
        <span
          onClick={abrirSuporte}
          className="cursor-pointer text-primary-500 hover:underline"
        >
          Fale com o suporte
        </span>
      </div>
    </>
  );
}
