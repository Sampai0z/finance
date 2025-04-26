import { useState, useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Package,
  Users,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import api from "../../services/api";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getAdminData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado");
      }

      const response = await api.get("/api/administrador", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const admin = response.data;
      setAdmin(admin);
    } catch (err) {
      err.response?.data?.message || "Erro desconhecido";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    getAdminData();
    if (!token) {
      navigate("/admin/login");
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };
  const isActive = (path) => {
    return location.pathname === path;
  };

  // if (!admin) {
  //   return null; // Ou um componente de carregamento
  // }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 p-1 rounded-md hover:bg-amber-100 lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-amber-800" />
            </button>
            <Link
              to="/admin/dashboard"
              className="text-xl font-bold text-amber-600"
            >
              SalgadosExpress{" "}
              <span className="text-sm font-normal text-gray-600">Admin</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-amber-100">
                <Bell className="h-5 w-5 text-amber-800" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-amber-600 rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-medium">
                {admin?.nome?.charAt(0) || "B"}
              </div>
              <span className="ml-2 font-medium text-gray-700 hidden md:inline">
                {admin?.nome || "Administrador"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-200 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b lg:hidden flex justify-between items-center">
            <span className="font-bold text-amber-800">Menu</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-amber-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-amber-800" />
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6 p-3 bg-amber-50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-medium">
                {admin?.nome?.charAt(0) || "X"}
              </div>
              <div>
                <div className="font-medium text-amber-900">
                  {admin?.nome || "Admin"}
                </div>
                <div className="text-sm text-amber-600">Administrador</div>
              </div>
            </div>

            <nav className="space-y-1">
              <Link
                to="/admin/dashboard"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive("/admin/dashboard")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/admin/pedidos"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive("/admin/pedidos") ||
                  location.pathname.startsWith("/admin/pedidos/")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Pedidos</span>
              </Link>

              <Link
                to="/admin/produtos"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive("/admin/produtos") ||
                  location.pathname.startsWith("/admin/produtos/")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Package className="h-5 w-5" />
                <span>Produtos</span>
              </Link>

              <Link
                to="/admin/clientes"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive("/admin/clientes") ||
                  location.pathname.startsWith("/admin/clientes/")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Users className="h-5 w-5" />
                <span>Clientes</span>
              </Link>

              <Link
                to="/admin/configuracoes"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive("/admin/configuracoes")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Settings className="h-5 w-5" />
                <span>Configurações</span>
              </Link>
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-800 w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
