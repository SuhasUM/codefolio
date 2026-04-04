import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/finance';
import EmptyState from '../common/EmptyState';

export default function CategoryBreakdownChart() {
  const { categoryBreakdown } = useAppContext();

  return (
    <section className="card">
      <h3>Spending Breakdown</h3>

      {!categoryBreakdown.length ? (
        <EmptyState title="No expense data" description="Add expense transactions to see category breakdown." />
      ) : (
        <div className="bar-chart-list">
          {categoryBreakdown.map((item) => (
            <div key={item.category} className="bar-row">
              <div className="bar-labels">
                <span>{item.category}</span>
                <span>{formatCurrency(item.amount)}</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${item.percentage}%` }} />
              </div>
              <small>{item.percentage.toFixed(1)}%</small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
