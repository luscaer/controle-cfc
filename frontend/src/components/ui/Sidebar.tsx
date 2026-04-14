import LogoIcon from "../../assets/logo-separado-branco.svg?react";

export function CustomSidebar() {
    return(
        <aside className="w-64 h-full flex flex-col bg-primary-800 text-white">
            <div className="p-6 flex-none border-b border-white/10">
                <LogoIcon></LogoIcon>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                Links de navegação
            </div>
            <div className="p-4 flex-none border-t border-white/10">

            </div>
        </aside>
    );
}