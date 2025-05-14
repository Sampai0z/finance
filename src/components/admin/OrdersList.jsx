"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  Calendar,
  Download,
  Printer,
} from "lucide-react";
import api from "../../services/api";

// Dados simulados de pedidos

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Usuário não autenticado");
        }
        const response = await api.get(
          "http://localhost:3000/api/lista_pedidos",
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
        console.error(err.response?.data?.message || err.message);
      }
    };
    fetchOrders();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [sortBy, setSortBy] = useState("data");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  console.log(orders);
  const filteredPedidos = orders
    .filter((pedido) => {
      const matchesSearch =
        pedido.cod_pedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.itens_pedido.some((item) =>
          item.produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFilter =
        filterStatus === "todos" ||
        pedido.status.toLowerCase() === filterStatus.toLowerCase();

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "data") {
        comparison = new Date(a.data_pedido) - new Date(b.data_pedido);
      } else if (sortBy === "valor") {
        comparison = parseFloat(a.preco_total) - parseFloat(b.preco_total);
      } else if (sortBy === "cliente") {
        comparison = a.cliente.nome.localeCompare(b.cliente.nome);
      } else if (sortBy === "id") {
        comparison = a.cod_pedido.localeCompare(b.cod_pedido);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "em preparo":
        return "bg-blue-100 text-blue-800";
      case "pronto para entrega":
        return "bg-purple-100 text-purple-800";
      case "em entrega":
        return "bg-indigo-100 text-indigo-800";
      case "entregue":
        return "bg-green-100 text-green-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((pedido) =>
        pedido.id === id ? { ...pedido, status: newStatus } : pedido
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Gerenciar Pedidos
          </h1>
          <p className="text-gray-600">Visualize e gerencie todos os pedidos</p>
        </div>

        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 px-3 py-2 bg-white border rounded-md text-gray-700 hover:bg-gray-50">
            <Printer className="h-4 w-4" />
            <span>Imprimir</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 bg-white border rounded-md text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar por número do pedido, cliente ou itens..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="pl-10 pr-8 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="todos">Todos os status</option>
                <option value="pendente">Pendente</option>
                <option value="em preparo">Em preparo</option>
                <option value="pronto para entrega">Pronto para entrega</option>
                <option value="em entrega">Em entrega</option>
                <option value="entregue">Entregue</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select className="pl-10 pr-8 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                <option value="hoje">Hoje</option>
                <option value="ontem">Ontem</option>
                <option value="semana">Esta semana</option>
                <option value="mes">Este mês</option>
                <option value="todos">Todos</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    Pedido
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("cliente")}
                >
                  <div className="flex items-center">
                    Cliente
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("data")}
                >
                  <div className="flex items-center">
                    Data
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("valor")}
                >
                  <div className="flex items-center">
                    Valor
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPedidos.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                filteredPedidos.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-amber-600">
                        {pedido.cod_pedido}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {pedido.cliente.nome}
                      </div>
                      <div className="text-xs text-gray-500">
                        {pedido.cliente.telefone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(pedido.data_pedido).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        R$ {pedido.preco_total}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative">
                        <select
                          value={pedido.status}
                          onChange={(e) =>
                            handleStatusChange(pedido.id, e.target.value)
                          }
                          className={`text-xs rounded-full py-1 pl-2 pr-6 border-0 ${getStatusColor(
                            pedido.status
                          )}`}
                        >
                          <option value="Pendente">Pendente</option>
                          <option value="Em preparo">Em preparo</option>
                          <option value="Pronto para entrega">
                            Pronto para entrega
                          </option>
                          <option value="Em entrega">Em entrega</option>
                          <option value="Entregue">Entregue</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/admin/pedidos/${pedido.id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver detalhes"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button
                          className="text-amber-600 hover:text-amber-900"
                          title="Editar"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Excluir"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 px-6 py-3 bg-gray-50 border-t">
          <div className="text-sm text-gray-700">
            Mostrando{" "}
            <span className="font-medium">{filteredPedidos.length}</span> de{" "}
            <span className="font-medium">{orders.length}</span> pedidos
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50">
              Anterior
            </button>
            <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
