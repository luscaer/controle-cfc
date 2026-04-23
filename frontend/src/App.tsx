import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { ProtectedRoute } from "./components/layouts/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { AcessoNegado } from "./pages/AcessoNegado";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { AutoEscolasDashboard } from "./pages/AutoEscolas";
import { HomeRedirect } from "./components/layouts/HomeRedirect";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
