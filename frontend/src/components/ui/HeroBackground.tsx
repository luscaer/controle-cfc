import {
  CarFront,
  ShieldCheck,
  GraduationCap,
  CalendarCheck,
  Network,
} from "lucide-react";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid de fundo arquitetônico */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgb(255 255 255 / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255 255 255 / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Nós de Inteligência (Ícones Espalhados do Lucide) */}
      <CarFront
        className="absolute top-20 right-10 text-white opacity-20"
        size={48}
      />

      <ShieldCheck
        className="absolute bottom-40 left-1/3 text-white opacity-20"
        size={56}
      />

      <GraduationCap
        className="absolute top-1/3 left-16 text-white opacity-30"
        size={64}
      />

      <CalendarCheck
        className="absolute bottom-24 right-1/4 text-white opacity-20"
        size={40}
      />

      <Network
        className="absolute top-1/4 right-1/3 text-white opacity-30"
        size={72}
      />
    </div>
  );
}
