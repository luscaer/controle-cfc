import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { ProtectedRoute } from "./components/layouts/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { AcessoNegado } from "./pages/AcessoNegado";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { AutoEscolasDashboard } from "./pages/autoescolas/AutoEscolasDashboard";
import { HomeRedirect } from "./components/layouts/HomeRedirect";
import { Toaster } from "sonner";
import { AutoEscolaDetalhes } from "./pages/autoescolas/AutoEscolaDetalhes";
import { EsqueciSenha } from "./pages/EsqueciSenha";
import { RedefinirSenha } from "./pages/RedefinirSenha";
import { FinalizarCadastro } from "./pages/FinalizarCadastro";
import { AuthLayout } from "./components/layouts/AuthLayout";

function App() {
  return (
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <Routes>
        {/* Grupo de Autenticação */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        </Route>

        {/* Grupo de Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomeRedirect />} />
          <Route
            path="auto-escolas"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <AutoEscolasDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="auto-escolas/:id"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMINISTRADOR"]}>
                <AutoEscolaDetalhes></AutoEscolaDetalhes>
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Grupo de Registro*/}
        <Route
          path="/registro"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <Registro />
            </ProtectedRoute>
          }
        />
        <Route path="/finalizar-cadastro" element={<FinalizarCadastro />} />
        
        {/* Grupo de Utils */}
        <Route path="/acesso-negado" element={<AcessoNegado />} />
        
      </Routes>
    </AuthProvider>
  );
}

export default App;
