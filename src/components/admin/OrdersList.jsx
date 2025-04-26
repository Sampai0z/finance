"use client";

import { useState } from "react";
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

// Dados simulados de pedidos
const pedidosData = [
  {
    id: "PED12350",
    cliente: "Maria Silva",
    telefone: "(11) 98765-4321",
    data: "15/11/2023 14:35",
    valor: 45.5,
    status: "Pendente",
    itens: ["2x Coxinha", "1x Pastel", "1x Refrigerante"],
    endereco: "Rua das Flores, 123 - Jardim Primavera",
  },
  {
    id: "PED12349",
    cliente: "João Oliveira",
    telefone: "(11) 97654-3210",
    data: "15/11/2023 13:22",
    valor: 68.0,
    status: "Em preparo",
    itens: ["3x Kibe", "2x Esfiha", "1x Suco"],
    endereco: "Av. Principal, 456 - Centro",
  },
  {
    id: "PED12348",
    cliente: "Ana Santos",
    telefone: "(11) 96543-2109",
    data: "15/11/2023 11:47",
    valor: 32.5,
    status: "Pronto para entrega",
    itens: ["4x Coxinha", "1x Refrigerante"],
    endereco: "Rua Secundária, 789 - Vila Nova",
  },
  {
    id: "PED12347",
    cliente: "Carlos Mendes",
    telefone: "(11) 95432-1098",
    data: "15/11/2023 10:15",
    valor: 54.0,
    status: "Em entrega",
    itens: ["1x Combo Festa", "2x Refrigerante"],
    endereco: "Alameda dos Anjos, 321 - Jardim Celeste",
  },
  {
    id: "PED12346",
    cliente: "Fernanda Lima",
    telefone: "(11) 94321-0987",
    data: "14/11/2023 18:40",
    valor: 42.0,
    status: "Entregue",
    itens: ["3x Pastel", "2x Kibe", "1x Suco"],
    endereco: "Rua das Margaridas, 654 - Jardim Florido",
  },
  {
    id: "PED12345",
    cliente: "Roberto Alves",
    telefone: "(11) 93210-9876",
    data: "14/11/2023 16:15",
    valor: 37.5,
    status: "Entregue",
    itens: ["5x Esfiha", "1x Refrigerante"],
    endereco: "Av. dos Estados, 987 - Parque Industrial",
  },
  {
    id: "PED12344",
    cliente: "Juliana Costa",
    telefone: "(11) 92109-8765",
    data: "14/11/2023 14:30",
    valor: 29.0,
    status: "Entregue",
    itens: ["2x Coxinha", "2x Pastel", "1x Suco"],
    endereco: "Rua dos Lírios, 159 - Jardim das Flores",
  },
  {
    id: "PED12343",
    cliente: "Marcelo Souza",
    telefone: "(11) 91098-7654",
    data: "14/11/2023 12:10",
    valor: 51.5,
    status: "Entregue",
    itens: ["1x Combo Família", "2x Refrigerante"],
    endereco: "Av. Paulista, 1000 - Bela Vista",
  },
];

export default function OrdersList() {
  const [pedidos, setPedidos] = useState(pedidosData);
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

  const filteredPedidos = pedidos
    .filter((pedido) => {
      const matchesSearch =
        pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.itens.some((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFilter =
        filterStatus === "todos" ||
        pedido.status.toLowerCase() === filterStatus.toLowerCase();

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "data") {
        comparison =
          new Date(a.data.split(" ")[0].split("/").reverse().join("-")) -
          new Date(b.data.split(" ")[0].split("/").reverse().join("-"));
      } else if (sortBy === "valor") {
        comparison = a.valor - b.valor;
      } else if (sortBy === "cliente") {
        comparison = a.cliente.localeCompare(b.cliente);
      } else if (sortBy === "id") {
        comparison = a.id.localeCompare(b.id);
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
    setPedidos(
      pedidos.map((pedido) =>
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
                        {pedido.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {pedido.cliente}
                      </div>
                      <div className="text-xs text-gray-500">
                        {pedido.telefone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pedido.data}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        R$ {pedido.valor.toFixed(2)}
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
            <span className="font-medium">{pedidos.length}</span> pedidos
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
