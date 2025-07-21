"use client";

import { useEffect, useRef, useState } from "react";
import { useTransactions } from "../context/ExpenseContext";
import Chart from "chart.js/auto";
import "./ExpenseCharts.css";

function TransactionCharts() {
  const { getMonthlyTotals, getCategoryDistribution, selectedMonth } =
    useTransactions();
  const [chartType, setChartType] = useState("expense"); // Para alternar entre gráficos de gastos e ganhos

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

    // Sort months chronologically
    const sortedMonths = Object.keys(monthlyTotals).sort();

    // Format month labels
    const formatMonth = (monthStr) => {
      const [year, month] = monthStr.split("-");
      return (
        new Date(year, month - 1).toLocaleString("pt-BR", { month: "short" }) +
        " " +
        year.slice(2)
      );
    };

    // Monthly chart
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
              backgroundColor: "rgba(46, 204, 113, 0.6)",
              borderColor: "rgba(46, 204, 113, 1)",
              borderWidth: 1,
            },
            {
              label: "Gastos",
              data: sortedMonths.map((month) => monthlyTotals[month].expense),
              backgroundColor: "rgba(231, 76, 60, 0.6)",
              borderColor: "rgba(231, 76, 60, 1)",
              borderWidth: 1,
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

    // Category chart
    if (categoryChartInstance.current) {
      categoryChartInstance.current.destroy();
    }

    if (
      categoryChartRef.current &&
      Object.keys(categoryDistribution).length > 0
    ) {
      // Generate colors for categories
      const generateColors = (count) => {
        const colors =
          chartType === "income"
            ? [
                "rgba(46, 204, 113, 0.7)",
                "rgba(52, 152, 219, 0.7)",
                "rgba(155, 89, 182, 0.7)",
                "rgba(52, 73, 94, 0.7)",
                "rgba(22, 160, 133, 0.7)",
                "rgba(39, 174, 96, 0.7)",
                "rgba(41, 128, 185, 0.7)",
                "rgba(142, 68, 173, 0.7)",
              ]
            : [
                "rgba(231, 76, 60, 0.7)",
                "rgba(230, 126, 34, 0.7)",
                "rgba(241, 196, 15, 0.7)",
                "rgba(243, 156, 18, 0.7)",
                "rgba(211, 84, 0, 0.7)",
                "rgba(192, 57, 43, 0.7)",
                "rgba(189, 195, 199, 0.7)",
                "rgba(127, 140, 141, 0.7)",
              ];

        // If we need more colors than in our predefined array, generate them
        if (count > colors.length) {
          for (let i = colors.length; i < count; i++) {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            colors.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
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
                color.replace("0.7", "1")
              ),
              borderWidth: 1,
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
    <div className="expense-charts-container">
      <h2>Gráficos</h2>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Comparação de Ganhos e Gastos por Mês</h3>
          <div className="chart-container">
            <canvas ref={monthlyChartRef}></canvas>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>
              Distribuição por Categoria
              {selectedMonth !== "all" && (
                <span className="chart-subtitle">
                  {" "}
                  (
                  {new Date(selectedMonth + "-01").toLocaleString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                  )
                </span>
              )}
            </h3>
            <div className="chart-type-selector">
              <button
                className={`chart-type-button ${
                  chartType === "expense" ? "active" : ""
                }`}
                onClick={() => setChartType("expense")}
              >
                Gastos
              </button>
              <button
                className={`chart-type-button ${
                  chartType === "income" ? "active" : ""
                }`}
                onClick={() => setChartType("income")}
              >
                Ganhos
              </button>
            </div>
          </div>
          <div className="chart-container">
            <canvas ref={categoryChartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionCharts;
