"use client";

import { useState } from "react";
import { useTransactions } from "../context/ExpenseContext";
import "./ExpenseList.css";

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

  // Get unique months from transactions
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

  return (
    <div className="expense-list-container">
      <h2>Lista de Transações</h2>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="month-filter">Filtrar por mês:</label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
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

        <div className="filter-group">
          <label htmlFor="type-filter">Filtrar por tipo:</label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Todos os tipos</option>
            <option value="income">Ganhos</option>
            <option value="expense">Gastos</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">Filtrar por categoria:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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

      {selectedMonth !== "all" && (
        <div
          className={`monthly-balance ${
            monthlyBalance >= 0 ? "positive" : "negative"
          }`}
        >
          <span>Saldo do mês: </span>
          <span className="balance-amount">
            {formatCurrency(monthlyBalance || 0)}
          </span>
        </div>
      )}

      {sortedTransactions.length > 0 ? (
        <div className="table-container">
          <table className="expense-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("date")}>
                  Data {getSortIndicator("date")}
                </th>
                <th onClick={() => handleSort("type")}>
                  Tipo {getSortIndicator("type")}
                </th>
                <th onClick={() => handleSort("category")}>
                  Categoria {getSortIndicator("category")}
                </th>
                <th onClick={() => handleSort("amount")}>
                  Valor {getSortIndicator("amount")}
                </th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={
                    transaction.type === "income" ? "income-row" : "expense-row"
                  }
                >
                  <td>{formatDate(transaction.date)}</td>
                  <td>{transaction.type === "income" ? "Ganho" : "Gasto"}</td>
                  <td>{transaction.category}</td>
                  <td
                    className={`amount-cell ${
                      transaction.type === "income"
                        ? "income-amount"
                        : "expense-amount"
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="description-cell">
                    {transaction.description || "-"}
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteTransaction(transaction.id)}
                      aria-label="Excluir"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-expenses">
          Nenhuma transação encontrada para os filtros selecionados.
        </p>
      )}

      {filteredTransactions.length > 0 && (
        <div className="totals-container">
          <div className="total-item">
            <p className="total-label">Total Ganhos:</p>
            <p className="total-amount income-amount">
              {formatCurrency(
                filteredTransactions
                  .filter((t) => t.type === "income")
                  .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)
              )}
            </p>
          </div>
          <div className="total-item">
            <p className="total-label">Total Gastos:</p>
            <p className="total-amount expense-amount">
              {formatCurrency(
                filteredTransactions
                  .filter((t) => t.type === "expense")
                  .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
