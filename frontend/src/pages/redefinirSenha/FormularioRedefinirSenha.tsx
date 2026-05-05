import { Spinner } from "../../components/ui/Spinner";
import { CustomInput } from "../../components/ui/Input";
import { CustomButton } from "../../components/ui/Button";
import { useRedefinirSenha } from "../../hooks/useRedefinirSenha";
import { Lock } from "lucide-react";

interface FormularioRedefinirSenhaProps {
  token: string;
}

export function FormularioRedefinirSenha({
  token,
}: FormularioRedefinirSenhaProps) {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting, isSubmitted },
    aoSubmeter,
  } = useRedefinirSenha(token);

  const confirmacao = watch("confirmacaoSenha");
  const mostrarErroConfirmacao =
    (isSubmitted || (confirmacao && confirmacao.length > 0)) &&
    errors.confirmacaoSenha;

  return (
    <form onSubmit={handleSubmit(aoSubmeter)} className="flex flex-col gap-4">
      {/* Campo senha */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="senha"
        >
          Senha
        </label>

        <CustomInput
          iconLeft={<Lock className="h-4 w-4 text-gray-400" />}
          type="password"
          id="senha"
          placeholder="••••••••"
          {...register("senha", {
            onChange: () => trigger("confirmacaoSenha"),
          })}
          hasError={!!errors.senha}
          showToggle={true}
        ></CustomInput>

        {errors.senha && (
          <span className="text-red-500 text-xs">{errors.senha.message}</span>
        )}

        <label
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          htmlFor="confirmacao-senha"
        >
          Confirmar
        </label>

        <CustomInput
          iconLeft={<Lock className="h-4 w-4 text-gray-400" />}
          type="password"
          id="confirmacao-senha"
          placeholder="••••••••"
          {...register("confirmacaoSenha")}
          hasError={!!mostrarErroConfirmacao}
          showToggle={true}
        ></CustomInput>

        {mostrarErroConfirmacao && (
          <p className="text-xs text-red-600">
            {errors.confirmacaoSenha?.message}
          </p>
        )}
      </div>

      <CustomButton
        type="submit"
        disabled={isSubmitting}
        variant="primary"
        size="md"
      >
        {isSubmitting && <Spinner size={14} />}
        Redefinir Senha
      </CustomButton>
    </form>
  );
}
