import { useParams } from "react-router-dom";
import { useAutoEscola } from "../../hooks/useAutoEscola";
import { LoadingScreen } from "../../components/ui/LoadingScreen";

export function AutoEscolaDetalhes() {
  const { id } = useParams();
  const { autoEscola, isLoading } = useAutoEscola(id);

  if (isLoading) return <LoadingScreen></LoadingScreen>;
  if (!autoEscola) return <div>Auto escola não encontrada</div>;

  return (
    <div>
      <h1>Auto Escola de ID {id}</h1>
      <p>Nome da auto escola: {autoEscola.nome}</p>
    </div>
  );
}
