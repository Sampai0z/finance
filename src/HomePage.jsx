import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import TransactionStats from "./components/TransactionStats";
import TransactionCharts from "./components/TransactionCharts";
import { ExpenseProvider } from "./context/ExpenseContext";

export default function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 pb-10">
          <main>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <TransactionForm />
              </div>
              <div className="lg:col-span-2">
                <TransactionStats />
              </div>
              <div className="lg:col-span-3">
                <TransactionCharts />
              </div>
              <div className="lg:col-span-3">
                <TransactionList />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ExpenseProvider>
  );
}
