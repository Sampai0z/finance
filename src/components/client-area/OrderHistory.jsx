import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  ShoppingBag,
} from "lucide-react";
import api from "../../services/api";

// const ordersData = [
//   {
//     id: "PED12345",
//     date: "15/11/2023",
//     status: "Entregue",
//     total: 45.9,
//     items: ["2x Coxinha", "3x Kibe", "1x Refrigerante"],
//   },
//   {
//     id: "PED12344",
//     date: "10/11/2023",
//     status: "Entregue",
//     total: 32.5,
//     items: ["4x Esfiha", "2x Pastel", "1x Suco"],
//   },
//   {
//     id: "PED12343",
//     date: "05/11/2023",
//     status: "Entregue",
//     total: 28.0,
//     items: ["2x Pastel", "2x Coxinha", "1x Refrigerante"],
//   },
//   {
//     id: "PED12342",
//     date: "01/11/2023",
//     status: "Entregue",
//     total: 37.5,
//     items: ["1x Combo Festa", "1x Refrigerante"],
//   },
//   {
//     id: "PED12341",
//     date: "25/10/2023",
//     status: "Entregue",
//     total: 42.0,
//     items: ["3x Esfiha", "2x Kibe", "2x Coxinha"],
//   },
// ];

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("todos");

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const [orders, setOrders] = useState([]);
  const [, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Usuário não autenticado");
        }
        const response = await api.get(
          "http://localhost:3000/api/lista_pedidos_user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // tem que ser assim
            },
          }
        );

        const formattedOrders = response.data.data.map((order) => {
          // Converte 'preco_total' para número antes de aplicar 'toFixed'
          const totalPrice = parseFloat(order.preco_total);
          return {
            ...order,
            preco_total: isNaN(totalPrice) ? "N/A" : totalPrice.toFixed(2), // Verifica se é um número válido
          };
        });

        setOrders(formattedOrders);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchOrders();
  }, []);

  // formata em "dd/mm/aaaa hh:mm"

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      String(order.id).toLowerCase().includes(searchTerm.toLowerCase()) || // Garantir que order.id é uma string
      order.items.some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilter =
      filterStatus === "todos" ||
      order.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-amber-800">Meus Pedidos</h1>
        <p className="text-amber-600">Histórico e detalhes dos seus pedidos.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar por número do pedido ou itens..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="pl-10 pr-8 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="todos">Todos os status</option>
              <option value="entregue">Entregue</option>
              <option value="a_fazer">Em andamento</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum pedido encontrado.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-amber-50 transition-colors"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-amber-800">
                        {order.cod_pedido}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {order.status
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 text-sm">
                        {new Date(order.data_pedido).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="font-bold text-amber-800">
                        R$ {order.preco_total}
                      </span>
                      {expandedOrder === order.id ? (
                        <ChevronUp className="h-5 w-5 text-amber-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-amber-600" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedOrder === order.id && order.itens_pedido && (
                  <div className="p-4 bg-amber-50 border-t">
                    <h3 className="font-medium text-amber-800 mb-2">
                      Itens do Pedido
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                      {order.itens_pedido ? (
                        order.itens_pedido.map((item, index) => (
                          <>
                            <li key={index}>
                              x{item.quantidade} {item.produto.nome}
                            </li>
                          </>
                        ))
                      ) : (
                        <li>Sem itens disponíveis</li>
                      )}
                    </ul>

                    {/* <div className="flex flex-wrap gap-4 mt-4">
                      <button className="flex items-center space-x-1 text-amber-600 hover:text-amber-800">
                        <Eye className="h-4 w-4" />
                        <span>Ver Detalhes Completos</span>
                      </button>
                      <button className="flex items-center space-x-1 text-amber-600 hover:text-amber-800">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Pedir Novamente</span>
                      </button>
                    </div> */}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
