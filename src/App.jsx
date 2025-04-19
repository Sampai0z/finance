import "./App.css";
import Login from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/homepage" element={<HomePage />} />
    </Routes>
  );
}

export default App;
