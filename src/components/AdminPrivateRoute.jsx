import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Se estiver logado, renderiza a rota
  return children;
};

export default AdminPrivateRoute;
