import "./App.css";
import Login from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Routes, Route } from "react-router-dom";
import ClientArea from "./pages/ClientArea.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./components/client-area/Profile.jsx";
import OrderHistory from "./components/client-area/OrderHistory.jsx";
import Addresses from "./components/client-area/Addresses.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route
        path="/area-cliente"
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
    </Routes>
  );
}

export default App;
