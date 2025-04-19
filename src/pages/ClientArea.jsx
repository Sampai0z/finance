import { useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  Home,
  Menu,
  X,
  Bell,
} from "lucide-react";

export default function ClientArea() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Simulando um usuário logado - em uma aplicação real, isso viria de um contexto de autenticação
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    // Lógica de logout aqui
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 p-1 rounded-md hover:bg-amber-100 md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-amber-800" />
            </button>
            <Link to="/" className="text-2xl font-bold text-amber-600">
              SalgadosExpress
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-amber-100">
                <Bell className="h-5 w-5 text-amber-800" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-amber-600 rounded-full text-white text-xs flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
            <Link
              to="/"
              className="hidden md:block text-amber-800 hover:text-amber-600"
            >
              <Home className="h-5 w-5" />
            </Link>
            <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-medium">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-200 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeSidebar}
        />

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:shadow-none ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4 border-b md:hidden flex justify-between items-center">
            <span className="font-bold text-amber-800">Menu</span>
            <button
              onClick={closeSidebar}
              className="p-1 rounded-md hover:bg-amber-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-amber-800" />
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6 p-3 bg-amber-50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-medium">
                JD
              </div>
              <div>
                <div className="font-medium text-amber-900">João da Silva</div>
                <div className="text-sm text-amber-600">Cliente desde 2023</div>
              </div>
            </div>

            <nav className="space-y-1">
              <Link
                to="/cliente"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive("/cliente")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
                onClick={closeSidebar}
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/cliente/pedidos"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive("/cliente/pedidos")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
                onClick={closeSidebar}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Meus Pedidos</span>
              </Link>

              <Link
                to="/cliente/perfil"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive("/cliente/perfil")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
                onClick={closeSidebar}
              >
                <User className="h-5 w-5" />
                <span>Meu Perfil</span>
              </Link>

              <Link
                to="/cliente/enderecos"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive("/cliente/enderecos")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
                onClick={closeSidebar}
              >
                <MapPin className="h-5 w-5" />
                <span>Meus Endereços</span>
              </Link>

              <Link
                to="/cliente/favoritos"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive("/cliente/favoritos")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
                onClick={closeSidebar}
              >
                <Heart className="h-5 w-5" />
                <span>Favoritos</span>
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
        <main className="flex-1 p-4">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
