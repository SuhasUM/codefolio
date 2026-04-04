import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/finance';

function Card({ title, value, tone }) {
  return (
    <article className={`card summary-card ${tone}`}>
      <p>{title}</p>
      <h3>{formatCurrency(value)}</h3>
    </article>
  );
}

export default function SummaryCards() {
  const { summary } = useAppContext();

  return (
    <section className="summary-grid">
      <Card title="Total Balance" value={summary.totalBalance} tone="tone-balance" />
      <Card title="Income" value={summary.income} tone="tone-income" />
      <Card title="Expenses" value={summary.expenses} tone="tone-expense" />
    </section>
  );
}
