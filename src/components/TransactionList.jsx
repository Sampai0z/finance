"use client";

import { useState } from "react";
import { useTransactions } from "../context/ExpenseContext";

const CATEGORIES_EXPENSE = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Moradia",
  "Saúde",
  "Educação",
  "Vestuário",
  "Outros",
];
const CATEGORIES_INCOME = [
  "Salário",
  "Freelance",
  "Investimentos",
  "Vendas",
  "Presentes",
  "Outros",
];
const ALL_CATEGORIES = [
  ...new Set([...CATEGORIES_EXPENSE, ...CATEGORIES_INCOME]),
];

function TransactionList() {
  const {
    transactions,
    deleteTransaction,
    selectedMonth,
    setSelectedMonth,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    getFilteredTransactions,
    getMonthlyBalance,
  } = useTransactions();

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const filteredTransactions = getFilteredTransactions();
  const months = [
    ...new Set(
      transactions.map((transaction) => transaction.date.substring(0, 7))
    ),
  ]
    .sort()
    .reverse();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value) => {
    return Number.parseFloat(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const monthlyBalance =
    selectedMonth !== "all" ? getMonthlyBalance(selectedMonth) : null;

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0);

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6">Lista de Transações</h2>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label
            htmlFor="month-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filtrar por mês:
          </label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-input"
          >
            <option value="all">Todos os meses</option>
            {months.map((month) => {
              const [year, monthNum] = month.split("-");
              const monthName = new Date(year, monthNum - 1).toLocaleString(
                "pt-BR",
                { month: "long" }
              );
              return (
                <option key={month} value={month}>
                  {monthName} {year}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label
            htmlFor="type-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filtrar por tipo:
          </label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="form-input"
          >
            <option value="all">Todos os tipos</option>
            <option value="income">💰 Ganhos</option>
            <option value="expense">💸 Gastos</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filtrar por categoria:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-input"
          >
            <option value="all">Todas as categorias</option>
            {ALL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Saldo do mês */}
      {selectedMonth !== "all" && (
        <div
          className={`p-4 rounded-lg mb-6 border-2 ${
            monthlyBalance >= 0
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Saldo do mês:</span>
            <span
              className={`text-xl font-bold ${
                monthlyBalance >= 0 ? "text-secondary" : "text-danger"
              }`}
            >
              {formatCurrency(monthlyBalance || 0)}
            </span>
          </div>
        </div>
      )}

      {/* Tabela de transações */}
      {sortedTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("date")}
                >
                  Data {getSortIndicator("date")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("type")}
                >
                  Tipo {getSortIndicator("type")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("category")}
                >
                  Categoria {getSortIndicator("category")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("amount")}
                >
                  Valor {getSortIndicator("amount")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={`hover:bg-gray-50 ${
                    transaction.type === "income" ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type === "income" ? "💰 Ganho" : "💸 Gasto"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.category}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      transaction.type === "income"
                        ? "text-secondary"
                        : "text-danger"
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {transaction.description || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="text-danger hover:text-danger-dark transition-colors p-1 rounded"
                      aria-label="Excluir transação"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-500 text-lg">
            Nenhuma transação encontrada para os filtros selecionados.
          </p>
        </div>
      )}

      {/* Totais */}
      {filteredTransactions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  💰 Total Ganhos:
                </span>
                <span className="text-xl font-bold text-secondary">
                  {formatCurrency(totalIncome)}
                </span>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  💸 Total Gastos:
                </span>
                <span className="text-xl font-bold text-danger">
                  {formatCurrency(totalExpense)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
