import { ShieldOff } from "lucide-react";

export function ErroAcesso({ mensagem }: { mensagem: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <ShieldOff size={36} className="mb-3 text-red-300" />
      <p className="text-sm font-medium text-gray-600">{mensagem}</p>
    </div>
  );
}