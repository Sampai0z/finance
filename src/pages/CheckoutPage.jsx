import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Landmark,
  QrCode,
  DollarSign,
  Truck,
  Clock,
} from "lucide-react";
import { useCart } from "../components/CartContext";
import api from "../services/api";
// Dados do carrinho

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "credit",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calcular valores
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = 5.0;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado");
      }

      // Buscar usuário autenticado
      const response = await api.get("/api/usuario", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;

      // Montar os dados para envio
      const produtos = cartItems.map((item) => ({
        produto_id: item.id, // ou item.produto_id dependendo da sua estrutura
        quantidade: item.quantity,
      }));

      const pedidoData = {
        cliente_id: user.id,
        produtos: produtos,
      };

      // Enviar pedido para API
      const pedidoResponse = await api.post("/api/pedidos", pedidoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("cartItems");

      const novoPedido = pedidoResponse.data.pedido;
      navigate("/cliente/pedido-confirmado", { state: { pedido: novoPedido } });
    } catch (err) {
      console.error(err.response?.data?.message || "Erro ao enviar pedido");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link
            to="/cliente/carrinho"
            className="text-amber-600 hover:text-amber-700 mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Finalizar Pedido</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário de checkout */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações pessoais */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Informações Pessoais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Endereço de entrega */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Endereço de Entrega
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Endereço
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="number"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Número
                    </label>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="complement"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Complemento
                    </label>
                    <input
                      type="text"
                      id="complement"
                      name="complement"
                      value={formData.complement}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="neighborhood"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bairro
                    </label>
                    <input
                      type="text"
                      id="neighborhood"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      CEP
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Cidade
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Estado
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="PR">Paraná</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="RS">Rio Grande do Sul</option>
                      {/* Adicione outros estados conforme necessário */}
                    </select>
                  </div>
                </div>
              </div>

              {/* Método de pagamento */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Método de Pagamento
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex flex-col space-y-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit"
                          checked={formData.paymentMethod === "credit"}
                          onChange={handleChange}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                        />
                        <span className="ml-2 flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                          Cartão de Crédito
                        </span>
                      </label>

                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="debit"
                          checked={formData.paymentMethod === "debit"}
                          onChange={handleChange}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                        />
                        <span className="ml-2 flex items-center">
                          <Landmark className="h-5 w-5 mr-2 text-gray-600" />
                          Cartão de Débito
                        </span>
                      </label>

                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="pix"
                          checked={formData.paymentMethod === "pix"}
                          onChange={handleChange}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                        />
                        <span className="ml-2 flex items-center">
                          <QrCode className="h-5 w-5 mr-2 text-gray-600" />
                          PIX
                        </span>
                      </label>

                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === "cash"}
                          onChange={handleChange}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                        />
                        <span className="ml-2 flex items-center">
                          <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                          Dinheiro na Entrega
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Campos de cartão de crédito/débito */}
                  {/* {(formData.paymentMethod === "credit" ||
                    formData.paymentMethod === "debit") && (
                    <div className="mt-4 p-4 border rounded-md bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Número do Cartão
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="0000 0000 0000 0000"
                            required={
                              formData.paymentMethod === "credit" ||
                              formData.paymentMethod === "debit"
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label
                            htmlFor="cardName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Nome no Cartão
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            required={
                              formData.paymentMethod === "credit" ||
                              formData.paymentMethod === "debit"
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="cardExpiry"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Data de Validade
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="MM/AA"
                            required={
                              formData.paymentMethod === "credit" ||
                              formData.paymentMethod === "debit"
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="cardCvv"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cardCvv"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="123"
                            required={
                              formData.paymentMethod === "credit" ||
                              formData.paymentMethod === "debit"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )} */}

                  {/* Instruções para PIX */}
                  {formData.paymentMethod === "pix" && (
                    <div className="mt-4 p-4 border rounded-md bg-gray-50">
                      <p className="text-sm text-gray-700">
                        Após confirmar o pedido, você receberá um QR Code para
                        pagamento via PIX.
                      </p>
                    </div>
                  )}

                  {/* Instruções para dinheiro */}
                  {formData.paymentMethod === "cash" && (
                    <div className="mt-4 p-4 border rounded-md bg-gray-50">
                      <p className="text-sm text-gray-700">
                        Por favor, tenha o valor exato para pagamento no momento
                        da entrega.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Observações */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Observações
                </h2>
                <div>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Instruções especiais para o pedido ou entrega..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? "Processando..." : "Finalizar Pedido"}
                </button>
              </div>
            </form>
          </div>

          {/* Resumo do pedido */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Resumo do Pedido
              </h2>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Itens ({cartItems.length})
                </h3>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">
                    R$ {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de entrega</span>
                  <span className="text-gray-800">
                    R$ {deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-amber-600 text-xl">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Entrega em 30-45 minutos</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Horário de funcionamento: 10h às 22h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-amber-800 text-white py-6 mt-8">
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
