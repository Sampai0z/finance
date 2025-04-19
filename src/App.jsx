import "./App.css";
import Login from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Routes, Route } from "react-router-dom";
import ClientArea from "./pages/ClientArea.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

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
      />
    </Routes>
  );
}

export default App;
