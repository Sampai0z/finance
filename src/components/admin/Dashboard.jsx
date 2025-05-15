"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Clock,
  Package,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

// Dados simulados para o dashboard
const dashboardData = {
  totalPedidos: 156,
  pedidosHoje: 12,
  clientesTotal: 89,
  clientesNovos: 5,
  faturamentoTotal: 8750.5,
  faturamentoHoje: 650.75,
  pedidosPendentes: 8,
  produtosMaisVendidos: [
    { id: 1, nome: "Coxinha de Frango", quantidade: 245, valor: 1347.5 },
    { id: 2, nome: "Pastel de Carne", quantidade: 187, valor: 1122.0 },
    { id: 3, nome: "Kibe", quantidade: 156, valor: 780.0 },
    { id: 4, nome: "Esfiha de Carne", quantidade: 134, valor: 737.0 },
  ],
  pedidosRecentes: [
    {
      id: "PED12350",
      cliente: "Maria Silva",
      data: "Hoje, 14:35",
      valor: 45.5,
      status: "Pendente",
    },
    {
      id: "PED12349",
      cliente: "João Oliveira",
      data: "Hoje, 13:22",
      valor: 68.0,
      status: "Em preparo",
    },
    {
      id: "PED12348",
      cliente: "Ana Santos",
      data: "Hoje, 11:47",
      valor: 32.5,
      status: "Entregue",
    },
    {
      id: "PED12347",
      cliente: "Carlos Mendes",
      data: "Hoje, 10:15",
      valor: 54.0,
      status: "Entregue",
    },
    {
      id: "PED12347",
      cliente: "Carlos Mendes",
      data: "Hoje, 10:15",
      valor: 54.0,
      status: "Entregue",
    },
    {
      id: "PED12347",
      cliente: "Carlos Mendes",
      data: "Hoje, 10:15",
      valor: 54.0,
      status: "Entregue",
    },
    {
      id: "PED12347",
      cliente: "Carlos Mendes",
      data: "Hoje, 10:15",
      valor: 54.0,
      status: "Entregue",
    },
  ],
};

export default function Dashboard() {
  const [data] = useState(dashboardData);

  // Em uma aplicação real, você buscaria esses dados de uma API
  useEffect(() => {
    // Simulação de busca de dados
    // setData(await fetchDashboardData())
  }, []);

  return (
    <div className="space-y-6 flex flex-col min-h-[80dvh] overflow-visible">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu negócio</p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total de Pedidos</p>
              <p className="text-2xl font-bold text-gray-800">
                {data.totalPedidos}
              </p>
              <div className="flex items-center mt-1 text-sm">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {data.pedidosHoje} hoje
                </span>
              </div>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <ShoppingBag className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Clientes</p>
              <p className="text-2xl font-bold text-gray-800">
                {data.clientesTotal}
              </p>
              <div className="flex items-center mt-1 text-sm">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {data.clientesNovos} novos
                </span>
              </div>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Faturamento</p>
              <p className="text-2xl font-bold text-gray-800">
                R$ {data.faturamentoTotal.toFixed(2)}
              </p>
              <div className="flex items-center mt-1 text-sm">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  R$ {data.faturamentoHoje.toFixed(2)} hoje
                </span>
              </div>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Pedidos Pendentes</p>
              <p className="text-2xl font-bold text-gray-800">
                {data.pedidosPendentes}
              </p>
              <div className="flex items-center mt-1 text-sm">
                <span className="text-amber-600 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Aguardando ação
                </span>
              </div>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pedidos recentes */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Pedidos Recentes
            </h2>
            <Link
              to="/admin/pedidos"
              className="text-amber-600 text-sm hover:underline flex items-center"
            >
              Ver todos <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="w-full overflow-x-auto rounded-md">
            <table className="min-w-[600px] md:min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pedido
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cliente
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Valor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.pedidosRecentes.map((pedido) => (
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{pedido.data}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        R$ {pedido.valor.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          pedido.status === "Entregue"
                            ? "bg-green-100 text-green-800"
                            : pedido.status === "Em preparo"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {pedido.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Produtos mais vendidos */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="md:text-lg lg:text-lg  font-semibold text-gray-800">
              Produtos Mais Vendidos
            </h2>
            <Link
              to="/admin/produtos"
              className="text-amber-600 text-sm hover:underline flex items-center"
            >
              <span className="sm:block lg:hidden">
                Ver todos
              </span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {data.produtosMaisVendidos.map((produto) => (
              <div
                key={produto.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-md bg-amber-100 flex items-center justify-center text-amber-600">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {produto.nome}
                    </p>
                    <p className="text-xs text-gray-500">
                      {produto.quantidade} vendidos
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  R$ {produto.valor.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
