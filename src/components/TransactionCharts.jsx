"use client";

import { useEffect, useRef, useState } from "react";
import { useTransactions } from "../context/ExpenseContext";
import Chart from "chart.js/auto";

function TransactionCharts() {
  const { getMonthlyTotals, getCategoryDistribution, selectedMonth } =
    useTransactions();
  const [chartType, setChartType] = useState("expense");

  const monthlyChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const monthlyChartInstance = useRef(null);
  const categoryChartInstance = useRef(null);

  useEffect(() => {
    const monthlyTotals = getMonthlyTotals();
    const categoryDistribution = getCategoryDistribution(
      selectedMonth,
      chartType
    );

    const sortedMonths = Object.keys(monthlyTotals).sort();

    const formatMonth = (monthStr) => {
      const [year, month] = monthStr.split("-");
      return (
        new Date(year, month - 1).toLocaleString("pt-BR", { month: "short" }) +
        " " +
        year.slice(2)
      );
    };

    // Gráfico mensal
    if (monthlyChartInstance.current) {
      monthlyChartInstance.current.destroy();
    }

    if (monthlyChartRef.current) {
      monthlyChartInstance.current = new Chart(monthlyChartRef.current, {
        type: "bar",
        data: {
          labels: sortedMonths.map(formatMonth),
          datasets: [
            {
              label: "Ganhos",
              data: sortedMonths.map((month) => monthlyTotals[month].income),
              backgroundColor: "rgba(46, 204, 113, 0.8)",
              borderColor: "rgba(46, 204, 113, 1)",
              borderWidth: 2,
            },
            {
              label: "Gastos",
              data: sortedMonths.map((month) => monthlyTotals[month].expense),
              backgroundColor: "rgba(231, 76, 60, 0.8)",
              borderColor: "rgba(231, 76, 60, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "R$ " + value.toLocaleString("pt-BR"),
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) =>
                  context.dataset.label +
                  ": R$ " +
                  context.raw.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
              },
            },
          },
        },
      });
    }

    // Gráfico de categorias
    if (categoryChartInstance.current) {
      categoryChartInstance.current.destroy();
    }

    if (
      categoryChartRef.current &&
      Object.keys(categoryDistribution).length > 0
    ) {
      const generateColors = (count) => {
        const colors =
          chartType === "income"
            ? [
                "rgba(46, 204, 113, 0.8)",
                "rgba(52, 152, 219, 0.8)",
                "rgba(155, 89, 182, 0.8)",
                "rgba(52, 73, 94, 0.8)",
                "rgba(22, 160, 133, 0.8)",
                "rgba(39, 174, 96, 0.8)",
                "rgba(41, 128, 185, 0.8)",
                "rgba(142, 68, 173, 0.8)",
              ]
            : [
                "rgba(231, 76, 60, 0.8)",
                "rgba(230, 126, 34, 0.8)",
                "rgba(241, 196, 15, 0.8)",
                "rgba(243, 156, 18, 0.8)",
                "rgba(211, 84, 0, 0.8)",
                "rgba(192, 57, 43, 0.8)",
                "rgba(189, 195, 199, 0.8)",
                "rgba(127, 140, 141, 0.8)",
              ];

        if (count > colors.length) {
          for (let i = colors.length; i < count; i++) {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            colors.push(`rgba(${r}, ${g}, ${b}, 0.8)`);
          }
        }

        return colors.slice(0, count);
      };

      const categories = Object.keys(categoryDistribution);
      const values = categories.map((cat) => categoryDistribution[cat]);
      const backgroundColors = generateColors(categories.length);

      categoryChartInstance.current = new Chart(categoryChartRef.current, {
        type: "doughnut",
        data: {
          labels: categories,
          datasets: [
            {
              data: values,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map((color) =>
                color.replace("0.8", "1")
              ),
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 15,
                padding: 15,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${context.label}: R$ ${value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (monthlyChartInstance.current) {
        monthlyChartInstance.current.destroy();
      }
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy();
      }
    };
  }, [getMonthlyTotals, getCategoryDistribution, selectedMonth, chartType]);

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6">📊 Gráficos</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico mensal */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-center">
            📈 Comparação Mensal de Ganhos e Gastos
          </h3>
          <div className="h-80">
            <canvas ref={monthlyChartRef}></canvas>
          </div>
        </div>

        {/* Gráfico de categorias */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h3 className="text-lg font-medium">
              🎯 Distribuição por Categoria
              {selectedMonth !== "all" && (
                <span className="block text-sm font-normal text-gray-500">
                  {new Date(selectedMonth + "-01").toLocaleString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </h3>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                  chartType === "expense"
                    ? "bg-danger text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
                onClick={() => setChartType("expense")}
              >
                💸 Gastos
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                  chartType === "income"
                    ? "bg-secondary text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
                onClick={() => setChartType("income")}
              >
                💰 Ganhos
              </button>
            </div>
          </div>
          <div className="h-80">
            <canvas ref={categoryChartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionCharts;
