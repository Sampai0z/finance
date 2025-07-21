"use client";

import { useState } from "react";
import { useTransactions } from "../context/ExpenseContext";
import "./ExpenseForm.css";

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

function TransactionForm() {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().substring(0, 10),
    description: "",
    type: "expense",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset category when changing transaction type
    if (name === "type" && formData.category) {
      setFormData({
        ...formData,
        [name]: value,
        category: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.amount ||
      !formData.category ||
      !formData.date ||
      !formData.type
    ) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    addTransaction(formData);

    setFormData({
      amount: "",
      category: "",
      date: new Date().toISOString().substring(0, 10),
      description: "",
      type: formData.type, // Mantém o último tipo selecionado
    });
  };

  const categories =
    formData.type === "expense" ? CATEGORIES_EXPENSE : CATEGORIES_INCOME;

  return (
    <div className="expense-form-container">
      <h2>Cadastrar Transação</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group type-selector">
          <div
            className={`type-option ${
              formData.type === "expense" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              id="expense"
              name="type"
              value="expense"
              checked={formData.type === "expense"}
              onChange={handleChange}
            />
            <label htmlFor="expense">Gasto</label>
          </div>
          <div
            className={`type-option ${
              formData.type === "income" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              id="income"
              name="type"
              value="income"
              checked={formData.type === "income"}
              onChange={handleChange}
            />
            <label htmlFor="income">Ganho</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Valor*</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0,00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria*</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Data*</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição (opcional)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Adicione uma descrição..."
            rows="5"
          />
        </div>

        <button
          type="submit"
          className={`submit-button bg-black ${
            formData.type === "income" ? "income-button" : ""
          }`}
        >
          Cadastrar {formData.type === "expense" ? "Gasto" : "Ganho"}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
