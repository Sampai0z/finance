"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../components/CartContext";
// import Navbar from "../components/Navbar";

// Dados simulados de produtos no carrinho
// const initialCartItems = [
//   {
//     id: 1,
//     name: "Coxinha de Frango",
//     description: "Coxinha tradicional de frango com catupiry",
//     price: 5.5,
//     image: "/placeholder.svg?height=200&width=200",
//     quantity: 2,
//   },
//   {
//     id: 2,
//     name: "Pastel de Carne",
//     description: "Pastel crocante recheado com carne moída temperada",
//     price: 6.0,
//     image: "/placeholder.svg?height=200&width=200",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     name: "Kibe",
//     description: "Kibe tradicional com recheio de carne moída e trigo",
//     price: 5.0,
//     image: "/placeholder.svg?height=200&width=200",
//     quantity: 3,
//   },
// ];

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(5.0);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Calcular subtotal quando os itens do carrinho mudam
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [cartItems]);

  // const updateQuantity = (id, newQuantity) => {
  //   if (newQuantity < 1) return;

  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  // const removeItem = (id) => {
  //   setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  // };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Por favor, insira um código de cupom");
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError("");

    // Simulação de verificação de cupom
    setTimeout(() => {
      if (couponCode.toUpperCase() === "SALGADOS10") {
        setDiscount(subtotal * 0.1); // 10% de desconto
      } else if (couponCode.toUpperCase() === "FRETE") {
        setDeliveryFee(0); // Frete grátis
      } else {
        setCouponError("Cupom inválido ou expirado");
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const total = subtotal + deliveryFee - discount;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-amber-600 hover:text-amber-700 mr-3">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Meu Carrinho</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-6">
              Adicione alguns itens deliciosos para começar seu pedido.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              Ver Cardápio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de itens do carrinho */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Itens do Carrinho ({cartItems.length})
                  </h2>
                </div>

                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 flex flex-col sm:flex-row"
                    >
                      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow sm:ml-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                            <p className="text-amber-600 font-medium mt-1">
                              R$ {item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center mt-4 sm:mt-0">
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1 text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-4 text-red-500 hover:text-red-700"
                              aria-label="Remover item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 text-right">
                          <p className="text-sm font-medium text-gray-800">
                            Subtotal: R${" "}
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumo do pedido */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Resumo do Pedido
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">
                      R$ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de entrega</span>
                    <span className="text-gray-800">
                      {deliveryFee > 0
                        ? `R$ ${deliveryFee.toFixed(2)}`
                        : "Grátis"}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto</span>
                      <span>- R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-800">Total</span>
                      <span className="text-amber-600 text-xl">
                        R$ {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cupom de desconto */}
                <div className="mb-6">
                  <label
                    htmlFor="coupon"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cupom de desconto
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow p-2 border rounded-l-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Digite seu cupom"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={isApplyingCoupon}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-md transition-colors disabled:opacity-70"
                    >
                      {isApplyingCoupon ? "Aplicando..." : "Aplicar"}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-sm mt-1">{couponError}</p>
                  )}
                </div>

                <Link
                  to="/cliente/checkout"
                  className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
                >
                  Finalizar Pedido
                </Link>

                <div className="mt-4">
                  <Link
                    to="/"
                    className="text-amber-600 hover:underline text-sm flex justify-center"
                  >
                    Continuar comprando
                  </Link>
                </div>
              </div>

              {/* Métodos de pagamento aceitos */}
              <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Aceitamos
                </h3>
                <div className="flex space-x-2">
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-amber-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} SalgadosExpress. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
