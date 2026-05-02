import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
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
                    <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMINISTRADOR"]} >
                        <AutoEscolaDetalhes></AutoEscolaDetalhes>
                    </ProtectedRoute>
                }
            />
          </Route>
          <Route
            path="/registro"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <Registro />
              </ProtectedRoute>
            }
          />
          <Route
            path="/acesso-negado"
            element={
              <ProtectedRoute>
                <AcessoNegado />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
