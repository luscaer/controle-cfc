import { useForm } from "react-hook-form";
import { RegisterValidatorSchema, type RegisterFormData } from "../schemas/registerSchema";
import { useNavigate } from "react-router-dom";
import { superRegistroInicial } from "../api/registroApi";
import { toast } from "sonner";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const CAMPOS_ETAPA_1 = ["nomeAutoEscola", "cnpj"] as const;

export function useRegistroForm(
  etapa: number,
  setEtapa: React.Dispatch<React.SetStateAction<number>>
) {
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterValidatorSchema),
    mode: "onTouched",
  });

  const avancarEtapa = async () => {
    const valido = await form.trigger(CAMPOS_ETAPA_1);
    if (valido) setEtapa((e) => e + 1);
  };

  const retrocederEtapa = () => setEtapa((e) => e - 1);

  const registrar = async (dados: RegisterFormData) => {
    try {
      await superRegistroInicial(dados);
      toast.success("Cadastro realizado!");
      navigate("/");
    } catch (error) {
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.mensagem
        : null;
      toast.error(mensagem ?? "Ocorreu um erro inesperado. Tente novamente.");
    }
  };

  return {
    ...form,
    avancarEtapa,
    retrocederEtapa,
    registrar,
    onCancelar: () => navigate("/"),
  };
}
