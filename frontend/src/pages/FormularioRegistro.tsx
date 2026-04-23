import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/apiClient";
import { EtapaAutoEscola } from "./registro/EtapaAutoEscola";
import { EtapaUsuario } from "./registro/EtapaUsuario";
import axios from "axios";
import { toast } from "sonner";
import {
  RegisterValidatorSchema,
  type RegisterFormData,
} from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface FormularioRegistroProps {
  etapa: number;
  setEtapa: React.Dispatch<React.SetStateAction<number>>;
}

export function FormularioRegistro({
  etapa,
  setEtapa,
}: FormularioRegistroProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterValidatorSchema),
    mode: "onTouched",
  });

  const avancarEtapa = async () => {
    const etapaValida = await trigger(["nomeAutoEscola", "cnpj"]);

    if (etapaValida) {
      setEtapa((etapa) => etapa + 1);
    }
  };

  const retrocederEtapa = () => {
    setEtapa((etapa) => etapa - 1);
  };

  const registrar = async (dados: RegisterFormData) => {
    try {
      const payloadDoBackend = {
        requestAutoEscola: {
          nome: dados.nomeAutoEscola,
          cnpj: dados.cnpj,
        },
        requestUsuario: {
          nome: dados.nomeUsuario,
          email: dados.email,
          senha: dados.senha,
          perfilUsuario: "INSTRUTOR",
        },
      };

      await apiClient.post("/v1/registro/super", payloadDoBackend);
      toast.success("Cadastro realizado!");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const mensagem = error.response?.data?.mensagem;
        toast.error(mensagem ?? "Ocorreu um erro inesperado.");
      } else {
        toast.error("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(registrar)}>
      {etapa === 1 && (
        <EtapaAutoEscola
          register={register}
          erros={errors}
          onCancelar={() => navigate("/")}
          onAvancar={avancarEtapa}
        />
      )}
      {etapa === 2 && (
        <EtapaUsuario
          register={register}
          trigger={trigger}
          erros={errors}
          watch={watch}
          setValue={setValue}
          isSubmitting={isSubmitting}
          onVoltar={retrocederEtapa}
        />
      )}
    </form>
  );
}
