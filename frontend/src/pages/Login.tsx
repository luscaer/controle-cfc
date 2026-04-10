import { LoadingScreen } from "../components/ui/LoadingScreen";
import LogoIcon from "../assets/logo.svg?react";


export function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-blue-600">
        Tela de Login
      </h1>
      <LoadingScreen 
            logo={<LogoIcon className="h-full w-full text-white" />}
        />
    </div>
  );
}
