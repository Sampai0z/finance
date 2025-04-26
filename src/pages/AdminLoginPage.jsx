import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import api from "../services/api";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await api.get("/api/adm/login", {
        params: { email, password: password },
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert(
        "Erro no login: " + err.response?.data?.message || "Erro desconhecido"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-50 to-amber-100 flex flex-col">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-amber-600">
            SalgadosExpress{" "}
            <span className="text-sm font-normal text-gray-600">Admin</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-amber-800">
              Área do Administrador
            </h1>
            <p className="text-gray-600 mt-2">
              Faça login para gerenciar pedidos e produtos
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="admin@exemplo.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70"
              >
                {isLoading ? "Processando..." : "Entrar"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <Link to="/" className="text-amber-600 hover:underline">
              Voltar para o site principal
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-amber-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} SalgadosExpress. Painel Administrativo
          </p>
        </div>
      </footer>
    </div>
  );
}
