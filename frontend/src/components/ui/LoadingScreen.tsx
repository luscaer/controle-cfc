interface LoadingScreenProps {
  logo?: React.ReactNode;
}

export function LoadingScreen({ logo }: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-8">

        {/* Logo com spinner */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 -m-2 animate-ping rounded-full bg-blue-600/10" />
          <div className="absolute -inset-1 animate-spin rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-200" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl p-3">
            {logo ?? <DefaultLogoFallback />}
          </div>
        </div>

        {/* Nome do sistema */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-2xl font-semibold tracking-tight text-gray-900">
            Controle <span className="font-normal text-blue-600">CFC</span>
          </p>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Verificando autenticação
          </p>
        </div>

        {/* Dots animados */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.32s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.16s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600" />
          </div>
          <p className="text-sm text-gray-400">Aguarde um momento...</p>
        </div>

      </div>
    </div>
  );
};

const DefaultLogoFallback = () => (
  <svg viewBox="0 0 44 44" fill="none" className="h-full w-full text-white">
    <rect x="4" y="4" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="3" />
    <polyline points="10,18 17,26 30,10" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);