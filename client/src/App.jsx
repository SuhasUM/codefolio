import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import SummaryCards from './components/dashboard/SummaryCards';
import BalanceTrendChart from './components/dashboard/BalanceTrendChart';
import CategoryBreakdownChart from './components/dashboard/CategoryBreakdownChart';
import InsightsPanel from './components/insights/InsightsPanel';
import TransactionsToolbar from './components/transactions/TransactionsToolbar';
import TransactionsTable from './components/transactions/TransactionsTable';
import TransactionFormModal from './components/transactions/TransactionFormModal';

export default function App() {
  return (
    <AppProvider>
      <div className="app-shell">
        <div className="container">
          <Header />

          <SummaryCards />

          <section className="chart-grid">
            <BalanceTrendChart />
            <CategoryBreakdownChart />
          </section>

          <section className="transactions-section">
            <TransactionsToolbar />
            <TransactionsTable />
          </section>

          <InsightsPanel />
        </div>
      </div>

      <TransactionFormModal />
    </AppProvider>
  );
}
