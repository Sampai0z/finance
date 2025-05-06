import { ShoppingCart } from "lucide-react";
import ProductGrid from "../components/ProductGrid";
import Cart from "../components/CartHomePage";
import { useCart } from "../components/CartContext";
import api from "../../src/services/api";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { addToCart, cartItems, setCartItems } = useCart();

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado");
      }

      const response = await api.get("/api/usuario", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;
      setUser(user);
    } catch (err) {
      console.error(err.response?.data?.message || "Erro desconhecido");
    }
  };

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      getUserData();
    } else {
      setIsLogin(false);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-amber-600">
            SalgadosExpress
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="font-medium hover:text-amber-600">
              Início
            </Link>
            <Link href="#produtos" className="font-medium hover:text-amber-600">
              Produtos
            </Link>
            <Link href="#sobre" className="font-medium hover:text-amber-600">
              Sobre
            </Link>
            <Link href="#contato" className="font-medium hover:text-amber-600">
              Contato
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
          {isLogin ? (<Link
              to="/cliente/carrinho"
              className="relative p-2 rounded-full hover:bg-amber-100"
            >
              <ShoppingCart className="h-6 w-6 text-amber-600" />
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </Link>) : ('')}

            {isLogin ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-full :bg-amber-100 transition-colors ">
                  <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-medium">
                    {user?.nome?.charAt(0) || "U"}
                  </div>
                  <span className="hidden md:inline font-medium text-gray-700">
                    {user?.nome?.split(" ")[0] || "Usuário"}
                  </span>
                </button>
                {/* Dropdown Menu */}
                <div className="z-10 hidden absolute bg-white rounded-md shadow-lg right-0 w-48  py-1 group-hover:block">
                  <Link
                    to="/cliente/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                  >
                    Minha Conta
                  </Link>
                  <Link
                    to="/cliente/pedidos"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                  >
                    Meus Pedidos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {/* <User className="h-5 w-5" /> */}
                <span>Entrar</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow flex-column">
        <section className="bg-gradient-to-r from-amber-50 to-amber-100 py-4">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
              Salgados Frescos e Deliciosos
            </h1>
            <p className="text-lg md:text-xl text-amber-700 mb-8 max-w-2xl mx-auto">
              Peça agora os melhores salgados da cidade. Entregamos em até 40
              minutos ou sua encomenda é grátis!
            </p>
            {/* <Link
              href="#produtos"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Ver Cardápio
            </Link> */}
          </div>
        </section>

        <section id="produtos" className="py-8 bg-white">
          <div className="flex flex-col items-center mx-auto px-4 ">
            <h2 className="text-3xl font-bold text-center mb-12 text-amber-800">
              Nosso Cardápio
            </h2>
            <ProductGrid onAddToCart={addToCart} />
          </div>
        </section>
        {!token && (
          <section className="py-16 bg-amber-50">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-amber-800">
                  Seu Pedido
                </h2>
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
              </div>
              <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">
                  Informações de Entrega
                </h3>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-1"
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-1"
                    >
                      Endereço
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Rua, número, bairro"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="complement"
                      className="block text-sm font-medium mb-1"
                    >
                      Complemento
                    </label>
                    <input
                      type="text"
                      id="complement"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Apto, bloco, referência"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="payment"
                      className="block text-sm font-medium mb-1"
                    >
                      Forma de Pagamento
                    </label>
                    <select
                      id="payment"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="dinheiro">Dinheiro</option>
                      <option value="cartao">Cartão na entrega</option>
                      <option value="pix">PIX</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Finalizar Pedido
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-amber-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SalgadosExpress</h3>
              <p className="mb-4">
                Os melhores salgados da cidade, entregues na sua porta.
              </p>
              <p>
                © {new Date().getFullYear()} SalgadosExpress. Todos os direitos
                reservados.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">
                Horário de Funcionamento
              </h3>
              <p className="mb-2">Segunda a Sexta: 8h às 20h</p>
              <p className="mb-2">Sábado: 9h às 18h</p>
              <p>Domingo: 9h às 15h</p>
            </div>
            <div id="contato">
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <p className="mb-2">Telefone: (11) 99999-9999</p>
              <p className="mb-2">Email: contato@salgadosexpress.com</p>
              <p>Endereço: Rua dos Salgados, 123 - São Paulo, SP</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
