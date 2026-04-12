import { Check } from "lucide-react";

interface StepIndicatorProps {
    numero: number;
    label: string;
    ativa: boolean;
    concluida: boolean;
}

export function StepIndicator({ numero, label, ativa, concluida }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`
        flex h-7 w-7 flex-shrink-0 items-center justify-center
        rounded-full border text-xs font-medium transition-all
        ${ativa     ? "border-white bg-white text-[#1B62A5]"    : ""}
        ${concluida ? "border-white/60 bg-white/20 text-white"  : ""}
        ${!ativa && !concluida ? "border-white/30 text-white/50" : ""}
      `}>
        {concluida ? <Check className="h-3.5 w-3.5" /> : numero}
      </div>
      <p className={`text-sm transition-all ${ativa ? "font-medium text-white" : "text-white/50"}`}>
        {label}
      </p>
    </div>
  );
}
