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
      type: formData.type,
    });
  };

  const categories =
    formData.type === "expense" ? CATEGORIES_EXPENSE : CATEGORIES_INCOME;

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6">Cadastrar Transação</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`p-3 rounded-lg border-2 font-medium transition-all ${
              formData.type === "expense"
                ? "bg-danger text-white border-danger"
                : "bg-white text-gray-700 border-gray-300 hover:border-danger hover:text-danger"
            }`}
            onClick={() =>
              handleChange({ target: { name: "type", value: "expense" } })
            }
          >
            💸 Gasto
          </button>
          <button
            type="button"
            className={`p-3 rounded-lg border-2 font-medium transition-all ${
              formData.type === "income"
                ? "bg-secondary text-white border-secondary"
                : "bg-white text-gray-700 border-gray-300 hover:border-secondary hover:text-secondary"
            }`}
            onClick={() =>
              handleChange({ target: { name: "type", value: "income" } })
            }
          >
            💰 Ganho
          </button>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Valor *
          </label>
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
            className="form-input"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Categoria *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Data *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Descrição (opcional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Adicione uma descrição..."
            rows="3"
            className="form-input resize-none"
          />
        </div>

        <button
          type="submit"
          className={`w-full btn text-lg ${
            formData.type === "income" ? "btn-secondary" : "btn-primary"
          }`}
        >
          Cadastrar {formData.type === "expense" ? "Gasto" : "Ganho"}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
