import { useTransactions } from "../context/ExpenseContext";
import "./ExpenseStats.css";

function TransactionStats() {
  const {
    getMonthlyTotals,
    getHighestExpenseMonth,
    getHighestIncomeMonth,
    selectedMonth,
    getCurrentBalance,
    // getMonthlyBalance,
  } = useTransactions();

  const monthlyTotals = getMonthlyTotals();
  const highestExpenseMonth = getHighestExpenseMonth();
  const highestIncomeMonth = getHighestIncomeMonth();
  const currentBalance = getCurrentBalance();

  const formatCurrency = (value) => {
    return Number.parseFloat(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatMonth = (monthStr) => {
    if (!monthStr) return "Nenhum";

    const [year, month] = monthStr.split("-");
    const monthName = new Date(year, month - 1).toLocaleString("pt-BR", {
      month: "long",
    });
    return `${monthName} ${year}`;
  };

  const currentMonthData =
    selectedMonth !== "all"
      ? monthlyTotals[selectedMonth] || { income: 0, expense: 0 }
      : null;

  return (
    <div className="expense-stats-container">
      <h2>Estatísticas</h2>

      <div className="stats-grid">
        <div className="stat-card balance">
          <h3>Saldo Atual</h3>
          <p
            className={`stat-value ${
              currentBalance >= 0 ? "positive-balance" : "negative-balance"
            }`}
          >
            {formatCurrency(currentBalance)}
          </p>
          <p className="stat-label">Total de todas as transações</p>
        </div>

        {selectedMonth !== "all" && (
          <div className="stat-card">
            <h3>Ganhos no Mês</h3>
            <p className="stat-value income">
              {formatCurrency(currentMonthData.income)}
            </p>
            <p className="stat-label">{formatMonth(selectedMonth)}</p>
          </div>
        )}

        {selectedMonth !== "all" && (
          <div className="stat-card">
            <h3>Gastos no Mês</h3>
            <p className="stat-value expense">
              {formatCurrency(currentMonthData.expense)}
            </p>
            <p className="stat-label">{formatMonth(selectedMonth)}</p>
          </div>
        )}

        <div className="stat-card highlight income">
          <h3>Mês com Maior Ganho</h3>
          <p className="stat-value">
            {formatCurrency(highestIncomeMonth.amount)}
          </p>
          <p className="stat-label">{formatMonth(highestIncomeMonth.month)}</p>
        </div>

        <div className="stat-card highlight expense">
          <h3>Mês com Maior Gasto</h3>
          <p className="stat-value">
            {formatCurrency(highestExpenseMonth.amount)}
          </p>
          <p className="stat-label">{formatMonth(highestExpenseMonth.month)}</p>
        </div>
      </div>
    </div>
  );
}

export default TransactionStats;
