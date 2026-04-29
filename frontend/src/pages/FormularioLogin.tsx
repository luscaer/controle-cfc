import { CustomInput } from "../components/ui/Input";
import { CustomButton } from "../components/ui/Button";
import { LockIcon, MailIcon } from "lucide-react";
import { Spinner } from "../components/ui/Spinner";
import { useLogin } from "../hooks/useLogin";

export function FormularioLogin() {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    aoSubmeter,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit(aoSubmeter)} className="flex flex-col gap-4">
      {/* Campo e-mail */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="email"
        >
          E-mail
        </label>

        <CustomInput
          iconLeft={<MailIcon className="h-4 w-4 text-gray-400" />}
          type="text"
          id="email"
          placeholder="seu@email.com"
          {...register("email")}
          hasError={!!errors.email}
        ></CustomInput>

        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </div>

      {/* Campo senha */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="senha"
        >
          Senha
        </label>

        <CustomInput
          iconLeft={<LockIcon className="h-4 w-4 text-gray-400" />}
          type="password"
          id="senha"
          placeholder="••••••••"
          {...register("senha")}
          hasError={!!errors.senha}
          showToggle={true}
        ></CustomInput>

        {errors.senha && (
          <span className="text-red-500 text-xs">{errors.senha.message}</span>
        )}
      </div>

      {/* Esqueceu a senha */}
      <div className="text-right -mt-1">
        <a href="#" className="text-xs text-primary-500 hover:underline">
          Esqueceu a senha?
        </a>
      </div>

      <CustomButton
        type="submit"
        disabled={isSubmitting}
        variant="primary"
        size="md"
      >
        {isSubmitting && <Spinner size={14} />}
        Entrar
      </CustomButton>
    </form>
  );
}
