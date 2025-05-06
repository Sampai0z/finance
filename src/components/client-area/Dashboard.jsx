import {
  ShoppingBag,
  MapPin,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get("http://localhost:3000/api/lista_pedidos_user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const rawData = response.data.data;
  
        // Mapeia os pedidos para a estrutura que o componente espera
        const mappedOrders = rawData.map((pedido) => ({
          id: pedido.cod_pedido,
          date: new Date(pedido.data_pedido).toLocaleDateString("pt-BR"),
          status: pedido.status,
          preco_total: pedido.preco_total,
          items: pedido.itens_pedido.map(
            (item) => `${item.quantidade}x ${item.produto.nome}`
          ),
        }));
  
        console.log("Pedidos formatados:", mappedOrders);
        setOrders(mappedOrders);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError(err.response?.data?.message || err.message);
      }
    };
  
    fetchOrders();
  }, []);
  

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      String(order.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(order.items)
        ? order.items.some((item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : String(order.items).toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filterStatus === "todos" ||
      order.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-amber-800">Olá, João!</h1>
        <p className="text-amber-600">Bem-vindo à sua área de cliente.</p>
      </div>

      {/* Input de busca e filtro */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar pedido..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/4"
        >
          <option value="todos">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="entregue">Entregue</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum pedido encontrado.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-amber-800">
                      {order.id || "ID"}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {order.status || "status"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.date || "Data não informada"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-800">
                    R$ {order.preco_total || "0,00"}
                  </p>
                  <Link
                    to={`/cliente/pedidos/${order.id}`}
                    className="text-amber-600 text-sm hover:underline"
                  >
                    Detalhes
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {Array.isArray(order.items)
                    ? order.items.join(", ")
                    : order.items}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-amber-800 mb-4">
          Ações Rápidas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/"
            className="flex items-center p-3 border rounded-lg hover:bg-amber-50 transition-colors"
          >
            <div className="bg-amber-100 p-2 rounded-full mr-3">
              <ShoppingBag className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-amber-800">Fazer Novo Pedido</p>
              <p className="text-sm text-gray-500">
                Peça seus salgados favoritos
              </p>
            </div>
          </Link>

          <Link
            to="/cliente/perfil"
            className="flex items-center p-3 border rounded-lg hover:bg-amber-50 transition-colors"
          >
            <div className="bg-amber-100 p-2 rounded-full mr-3">
              <User className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-amber-800">Atualizar Perfil</p>
              <p className="text-sm text-gray-500">Edite suas informações</p>
            </div>
          </Link>

          <Link
            to="/cliente/enderecos"
            className="flex items-center p-3 border rounded-lg hover:bg-amber-50 transition-colors"
          >
            <div className="bg-amber-100 p-2 rounded-full mr-3">
              <MapPin className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-amber-800">Adicionar Endereço</p>
              <p className="text-sm text-gray-500">Cadastre um novo local</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
