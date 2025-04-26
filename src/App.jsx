import "./App.css";
import Login from "./pages/LoginPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
{
  /* Rotas Clientes */
}
import ClientArea from "./pages/ClientArea.jsx";
import Profile from "./components/client-area/Profile.jsx";
import OrderHistory from "./components/client-area/OrderHistory.jsx";
import Addresses from "./components/client-area/Addresses.jsx";
import Dashboard from "./components/client-area/Dashboard.jsx";
{
  /* Rotas administrativas */
}
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./components/admin/Dashboard.jsx";
import OrdersList from "./components/admin/OrdersList.jsx";
import OrderDetail from "./components/admin/OrderDetail.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      {/* Rotas Clientes */}
      <Route
        path="/cliente"
        element={
          <PrivateRoute>
            <ClientArea />
          </PrivateRoute>
        }
      >
        <Route
          path="perfil"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="pedidos"
          element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="enderecos"
          element={
            <PrivateRoute>
              <Addresses />
            </PrivateRoute>
          }
        />
      </Route>
      {/* Rotas administrativas */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <AdminPrivateRoute>
            <AdminLayout />
          </AdminPrivateRoute>
        }
      >
        <Route
          path="dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="pedidos"
          element={
            <AdminPrivateRoute>
              <OrdersList />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="pedidos/:id"
          element={
            <AdminPrivateRoute>
              <OrderDetail />
            </AdminPrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
