"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  Download,
  MapPin,
  Phone,
  User,
  DollarSign,
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

// Dados simulados de pedidos
const pedidosData = [
  {
    id: "PED12350",
    cliente: "Maria Silva",
    telefone: "(11) 98765-4321",
    email: "maria.silva@email.com",
    data: "15/11/2023 14:35",
    valor: 45.5,
    status: "Pendente",
    formaPagamento: "Cartão de Crédito",
    itens: [
      {
        nome: "Coxinha de Frango",
        quantidade: 2,
        valorUnitario: 5.5,
        valorTotal: 11.0,
      },
      {
        nome: "Pastel de Carne",
        quantidade: 1,
        valorUnitario: 6.0,
        valorTotal: 6.0,
      },
      {
        nome: "Refrigerante Lata",
        quantidade: 1,
        valorUnitario: 5.0,
        valorTotal: 5.0,
      },
    ],
    endereco: {
      rua: "Rua das Flores",
      numero: "123",
      complemento: "Apto 101",
      bairro: "Jardim Primavera",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",
    },
    taxaEntrega: 8.0,
    subtotal: 22.0,
    desconto: 0,
    total: 30.0,
    observacoes: "Entregar na portaria. Sem cebola no pastel, por favor.",
    historico: [
      {
        data: "15/11/2023 14:35",
        status: "Pedido recebido",
        descricao: "Pedido registrado no sistema",
      },
      {
        data: "15/11/2023 14:40",
        status: "Pagamento confirmado",
        descricao: "Pagamento aprovado via Cartão de Crédito",
      },
    ],
  },
  // Outros pedidos...
];

export default function OrderDetail() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [novoStatus, setNovoStatus] = useState("");

  useEffect(() => {
    // Em uma aplicação real, você buscaria os dados do pedido de uma API
    const pedidoEncontrado = pedidosData.find((p) => p.id === id);

    if (pedidoEncontrado) {
      setPedido(pedidoEncontrado);
      setNovoStatus(pedidoEncontrado.status);
    }

    setLoading(false);
  }, [id]);

  const handleStatusChange = () => {
    if (novoStatus !== pedido.status) {
      // Em uma aplicação real, você enviaria esta atualização para uma API
      setPedido({
        ...pedido,
        status: novoStatus,
        historico: [
          ...pedido.historico,
          {
            data: new Date().toLocaleString("pt-BR"),
            status: "Status atualizado",
            descricao: `Status alterado de ${pedido.status} para ${novoStatus}`,
          },
        ],
      });
    }
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Pedido não encontrado
        </h2>
        <p className="text-gray-600 mb-6">
          O pedido que você está procurando não existe ou foi removido.
        </p>
        <Link
          to="/admin/pedidos"
          className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar para a lista de pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/admin/pedidos"
            className="mr-4 text-gray-600 hover:text-amber-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Pedido {pedido.id}
              <span
                className={`ml-3 text-sm px-3 py-1 rounded-full ${getStatusColor(
                  pedido.status
                )}`}
              >
                {pedido.status}
              </span>
            </h1>
            <p className="text-gray-600">Realizado em {pedido.data}</p>
          </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda - Detalhes do pedido */}
        <div className="lg:col-span-2 space-y-6">
          {/* Atualizar status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Atualizar Status
            </h2>
            <div className="flex items-center space-x-4">
              <select
                value={novoStatus}
                onChange={(e) => setNovoStatus(e.target.value)}
                className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="Pendente">Pendente</option>
                <option value="Em preparo">Em preparo</option>
                <option value="Pronto para entrega">Pronto para entrega</option>
                <option value="Em entrega">Em entrega</option>
                <option value="Entregue">Entregue</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              <button
                onClick={handleStatusChange}
                disabled={novoStatus === pedido.status}
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Atualizar
              </button>
            </div>
          </div>

          {/* Itens do pedido */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Itens do Pedido
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantidade
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Valor Unitário
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Valor Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pedido.itens.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.nome}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.quantidade}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          R$ {item.valorUnitario.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          R$ {item.valorTotal.toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                    >
                      Subtotal
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      R$ {pedido.subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                    >
                      Taxa de Entrega
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      R$ {pedido.taxaEntrega.toFixed(2)}
                    </td>
                  </tr>
                  {pedido.desconto > 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                      >
                        Desconto
                      </td>
                      <td className="px-6 py-3 text-sm text-green-600">
                        - R$ {pedido.desconto.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-3 text-right text-sm font-bold text-gray-900"
                    >
                      Total
                    </td>
                    <td className="px-6 py-3 text-sm font-bold text-gray-900">
                      R$ {pedido.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Histórico do pedido */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Histórico do Pedido
            </h2>
            <div className="space-y-4">
              {pedido.historico.map((evento, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-amber-600"></div>
                    {index < pedido.historico.length - 1 && (
                      <div className="h-full w-0.5 bg-amber-200"></div>
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">
                        {evento.status}
                      </p>
                      <span className="ml-2 text-xs text-gray-500">
                        {evento.data}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{evento.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observações */}
          {pedido.observacoes && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Observações
              </h2>
              <p className="text-gray-700">{pedido.observacoes}</p>
            </div>
          )}
        </div>

        {/* Coluna da direita - Informações do cliente e entrega */}
        <div className="space-y-6">
          {/* Informações do cliente */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Informações do Cliente
            </h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {pedido.cliente}
                  </p>
                  <p className="text-sm text-gray-600">{pedido.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-3" />
                <p className="text-sm text-gray-900">{pedido.telefone}</p>
              </div>
            </div>
          </div>

          {/* Endereço de entrega */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Endereço de Entrega
            </h2>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900">
                  {pedido.endereco.rua}, {pedido.endereco.numero}
                  {pedido.endereco.complemento &&
                    ` - ${pedido.endereco.complemento}`}
                </p>
                <p className="text-sm text-gray-900">
                  {pedido.endereco.bairro}, {pedido.endereco.cidade} -{" "}
                  {pedido.endereco.estado}
                </p>
                <p className="text-sm text-gray-900">
                  CEP: {pedido.endereco.cep}
                </p>
              </div>
            </div>
          </div>

          {/* Informações de pagamento */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Informações de Pagamento
            </h2>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Forma de Pagamento
                </p>
                <p className="text-sm text-gray-600">{pedido.formaPagamento}</p>
              </div>
            </div>
          </div>

          {/* Ações rápidas */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Ações Rápidas
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-amber-50 rounded-lg text-amber-800 hover:bg-amber-100">
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-3" />
                  <span>Marcar como Em Preparo</span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg text-blue-800 hover:bg-blue-100">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-3" />
                  <span>Marcar como Em Entrega</span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg text-green-800 hover:bg-green-100">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span>Marcar como Entregue</span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
