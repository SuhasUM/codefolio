import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/finance';
import EmptyState from '../common/EmptyState';

export default function BalanceTrendChart() {
  const { monthlyTrend } = useAppContext();

  if (!monthlyTrend.length) {
    return (
      <section className="card">
        <h3>Balance Trend</h3>
        <EmptyState title="No trend data" description="Add transactions to visualize balance over time." />
      </section>
    );
  }

  const balances = monthlyTrend.map((m) => m.balance);
  const maxValue = Math.max(...balances);
  const minValue = Math.min(...balances);
  const range = maxValue - minValue || 1;

  const width = 520;
  const height = 220;
  const padding = 24;

  const points = monthlyTrend
    .map((entry, index) => {
      const x = padding + (index * (width - padding * 2)) / Math.max(monthlyTrend.length - 1, 1);
      const y = padding + ((maxValue - entry.balance) * (height - padding * 2)) / range;
      return `${x},${y}`;
    })
    .join(' ');

  const latest = monthlyTrend[monthlyTrend.length - 1];

  return (
    <section className="card">
      <div className="chart-head">
        <h3>Balance Trend</h3>
        <p>Current: {formatCurrency(latest.balance)}</p>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="line-chart" role="img" aria-label="Monthly balance trend">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="axis" />
        <polyline points={points} fill="none" className="line" />
        {monthlyTrend.map((entry, index) => {
          const x = padding + (index * (width - padding * 2)) / Math.max(monthlyTrend.length - 1, 1);
          const y = padding + ((maxValue - entry.balance) * (height - padding * 2)) / range;
          return <circle key={entry.key} cx={x} cy={y} r="4" className="point" />;
        })}
      </svg>

      <div className="x-labels">
        {monthlyTrend.map((entry) => (
          <span key={entry.key}>{entry.month}</span>
        ))}
      </div>
    </section>
  );
}
