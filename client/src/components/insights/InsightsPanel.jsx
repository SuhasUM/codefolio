import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/finance';

export default function InsightsPanel() {
  const { insights } = useAppContext();

  const changeText =
    insights.monthlyComparison.monthlyChange > 0
      ? `${insights.monthlyComparison.monthlyChange.toFixed(1)}% higher`
      : `${Math.abs(insights.monthlyComparison.monthlyChange).toFixed(1)}% lower`;

  return (
    <section className="card insights">
      <h3>Insights</h3>

      <ul>
        <li>
          <span>Highest spending category</span>
          <strong>
            {insights.highestCategory
              ? `${insights.highestCategory.category} (${formatCurrency(insights.highestCategory.amount)})`
              : 'No expense data'}
          </strong>
        </li>

        <li>
          <span>Monthly expense comparison</span>
          <strong>{changeText}</strong>
        </li>

        <li>
          <span>Average transaction value</span>
          <strong>{formatCurrency(insights.averageTransaction)}</strong>
        </li>
      </ul>
    </section>
  );
}
