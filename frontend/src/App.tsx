import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/layouts/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { AcessoNegado } from "./pages/AcessoNegado";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
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
