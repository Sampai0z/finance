"use client";

import { Link } from "react-router-dom";
import { CheckCircle, Home, ShoppingBag, Clock } from "lucide-react";
// import Navbar from "../components/Navbar";

export default function OrderConfirmationPage() {
  // Dados simulados do pedido
  const orderData = {
    id: "PED12351",
    date: new Date().toLocaleString("pt-BR"),
    total: 32.5,
    estimatedDelivery: "30-45 minutos",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Pedido Confirmado!
            </h1>
            <p className="text-gray-600 mb-6">
              Seu pedido #{orderData.id} foi recebido e está sendo processado.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-500">Número do Pedido</p>
                  <p className="font-medium text-gray-800">{orderData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data</p>
                  <p className="font-medium text-gray-800">{orderData.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium text-gray-800">
                    R$ {orderData.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Entrega Estimada</p>
                  <p className="font-medium text-gray-800">
                    {orderData.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center text-amber-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>Acompanhe o status do seu pedido na área do cliente</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/cliente/pedidos"
                className="flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Meus Pedidos</span>
              </Link>
              <Link
                to="/"
                className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-100 text-amber-600 font-medium py-3 px-6 rounded-lg transition-colors border border-amber-600"
              >
                <Home className="h-5 w-5" />
                <span>Voltar para o Início</span>
              </Link>
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
