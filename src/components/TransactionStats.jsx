import { useTransactions } from "../context/ExpenseContext";

function TransactionStats() {
  const {
    getMonthlyTotals,
    getHighestExpenseMonth,
    getHighestIncomeMonth,
    selectedMonth,
    getCurrentBalance,
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
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6">Estatísticas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Saldo Atual */}
        <div
          className={`p-6 rounded-xl shadow-sm border-2 col-span-full ${
            currentBalance >= 0
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Saldo Atual</h3>
              <p className="text-sm text-gray-500">
                Total de todas as transações
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-3xl font-bold ${
                  currentBalance >= 0 ? "text-secondary" : "text-danger"
                }`}
              >
                {formatCurrency(currentBalance)}
              </p>
            </div>
          </div>
        </div>

        {/* Estatísticas do mês selecionado */}
        {selectedMonth !== "all" && (
          <>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                💰 Ganhos no Mês
              </h3>
              <p className="text-2xl font-bold text-secondary">
                {formatCurrency(currentMonthData.income)}
              </p>
              <p className="text-sm text-gray-500">
                {formatMonth(selectedMonth)}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                💸 Gastos no Mês
              </h3>
              <p className="text-2xl font-bold text-danger">
                {formatCurrency(currentMonthData.expense)}
              </p>
              <p className="text-sm text-gray-500">
                {formatMonth(selectedMonth)}
              </p>
            </div>
          </>
        )}

        {/* Recordes */}
        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            🏆 Maior Ganho Mensal
          </h3>
          <p className="text-2xl font-bold text-secondary">
            {formatCurrency(highestIncomeMonth.amount)}
          </p>
          <p className="text-sm text-gray-500">
            {formatMonth(highestIncomeMonth.month)}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            📊 Maior Gasto Mensal
          </h3>
          <p className="text-2xl font-bold text-danger">
            {formatCurrency(highestExpenseMonth.amount)}
          </p>
          <p className="text-sm text-gray-500">
            {formatMonth(highestExpenseMonth.month)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransactionStats;
