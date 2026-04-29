import { useAuth } from "../../context/AuthContext";

interface SlideOverPerfilProps {
  aberto: boolean;
  onFechar: () => void;
}

export function SlideOverPerfil({ aberto, onFechar }: SlideOverPerfilProps) {
  const { usuario, updateMyUser } = useAuth();

  if (!aberto) return null;

  return (
    <div className="flex fixed inset-0 z-50">
      <div onClick={onFechar} className="absolute inset-0 bg-black/50"/>
      <div className="relative ml-auto w-96 h-full bg-white">
        <h1>Meus dados</h1>
      </div>
    </div>
  );
}
