import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-50 to-amber-100 flex flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-amber-600">
            SalgadosExpress
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="font-medium hover:text-amber-600">
              Início
            </Link>
            <Link to="/#produtos" className="font-medium hover:text-amber-600">
              Produtos
            </Link>
            <Link to="/#sobre" className="font-medium hover:text-amber-600">
              Sobre
            </Link>
            <Link to="/#contato" className="font-medium hover:text-amber-600">
              Contato
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-amber-800">
              {isLogin ? "Entrar na sua conta" : "Criar uma nova conta"}
            </h1>
            <p className="text-gray-600 mt-2">
              {isLogin
                ? "Entre para fazer seus pedidos de salgados"
                : "Cadastre-se para começar a pedir salgados deliciosos"}
            </p>
          </div>

          <div className="flex border-b mb-6">
            <button
              className={`flex-1 py-2 text-center font-medium ${
                isLogin
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-amber-600"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center font-medium ${
                !isLogin
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-amber-600"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Cadastro
            </button>
          </div>

          {isLogin ? <LoginForm /> : <RegisterForm />}

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <p>
                Não tem uma conta?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-amber-600 hover:underline font-medium"
                >
                  Cadastre-se
                </button>
              </p>
            ) : (
              <p>
                Já tem uma conta?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-amber-600 hover:underline font-medium"
                >
                  Faça login
                </button>
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-amber-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} SalgadosExpress. Todos os direitos
            reservados.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link
              to="/termos"
              className="text-amber-200 hover:underline text-sm"
            >
              Desenvolvido por DuoWave
            </Link>
            <Link
              to="/termos"
              className="text-amber-200 hover:underline text-sm"
            >
              Termos de Uso
            </Link>
            <Link
              to="/privacidade"
              className="text-amber-200 hover:underline text-sm"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
