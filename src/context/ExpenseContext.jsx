"use client";

import { createContext, useContext, useState, useEffect } from "react";

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const getFilteredTransactions = () => {
    return transactions.filter((transaction) => {
      const transactionMonth = transaction.date.substring(0, 7);
      return (
        (selectedMonth === "all" || transactionMonth === selectedMonth) &&
        (selectedCategory === "all" ||
          transaction.category === selectedCategory) &&
        (selectedType === "all" || transaction.type === selectedType)
      );
    });
  };

  const getMonthlyTotals = () => {
    const monthlyTotals = {};

    transactions.forEach((transaction) => {
      const month = transaction.date.substring(0, 7);
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = { income: 0, expense: 0 };
      }

      const amount = Number.parseFloat(transaction.amount);
      if (transaction.type === "income") {
        monthlyTotals[month].income += amount;
      } else {
        monthlyTotals[month].expense += amount;
      }
    });

    return monthlyTotals;
  };

  const getHighestExpenseMonth = () => {
    const monthlyTotals = getMonthlyTotals();
    let highestMonth = null;
    let highestAmount = 0;

    Object.entries(monthlyTotals).forEach(([month, totals]) => {
      if (totals.expense > highestAmount) {
        highestAmount = totals.expense;
        highestMonth = month;
      }
    });

    return { month: highestMonth, amount: highestAmount };
  };

  const getHighestIncomeMonth = () => {
    const monthlyTotals = getMonthlyTotals();
    let highestMonth = null;
    let highestAmount = 0;

    Object.entries(monthlyTotals).forEach(([month, totals]) => {
      if (totals.income > highestAmount) {
        highestAmount = totals.income;
        highestMonth = month;
      }
    });

    return { month: highestMonth, amount: highestAmount };
  };

  const getCurrentBalance = () => {
    return transactions.reduce((balance, transaction) => {
      const amount = Number.parseFloat(transaction.amount);
      return transaction.type === "income"
        ? balance + amount
        : balance - amount;
    }, 0);
  };

  const getMonthlyBalance = (month) => {
    return transactions
      .filter(
        (transaction) =>
          month === "all" || transaction.date.substring(0, 7) === month
      )
      .reduce((balance, transaction) => {
        const amount = Number.parseFloat(transaction.amount);
        return transaction.type === "income"
          ? balance + amount
          : balance - amount;
      }, 0);
  };

  const getCategoryDistribution = (month, type = "expense") => {
    const categoryTotals = {};

    transactions
      .filter(
        (transaction) =>
          (month === "all" || transaction.date.substring(0, 7) === month) &&
          transaction.type === type
      )
      .forEach((transaction) => {
        if (!categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] = 0;
        }
        categoryTotals[transaction.category] += Number.parseFloat(
          transaction.amount
        );
      });

    return categoryTotals;
  };

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    selectedMonth,
    setSelectedMonth,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    getFilteredTransactions,
    getMonthlyTotals,
    getHighestExpenseMonth,
    getHighestIncomeMonth,
    getCategoryDistribution,
    getCurrentBalance,
    getMonthlyBalance,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
