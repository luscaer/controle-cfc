import { MailIcon } from "lucide-react";
import { useEsqueciSenha } from "../../hooks/useEsqueciSenha";
import { Spinner } from "../../components/ui/Spinner";
import { CustomInput } from "../../components/ui/Input";
import { CustomButton } from "../../components/ui/Button";

export function FormularioEsqueciSenha() {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    aoSubmeter,
  } = useEsqueciSenha();

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

      <CustomButton
        type="submit"
        disabled={isSubmitting}
        variant="primary"
        size="md"
      >
        {isSubmitting && <Spinner size={14} />}
        Recuperar Senha
      </CustomButton>
    </form>
  );
}
