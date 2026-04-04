import { useAppContext } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/finance';
import EmptyState from '../common/EmptyState';

export default function TransactionsTable() {
  const { state, dispatch, visibleTransactions } = useAppContext();

  const onDelete = (id) => {
    const confirmed = window.confirm('Delete this transaction?');
    if (!confirmed) return;
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  if (!visibleTransactions.length) {
    return (
      <section className="card">
        <h3>Transactions</h3>
        <EmptyState
          title="No matching transactions"
          description="Try changing filters/search or add a new transaction as admin."
        />
      </section>
    );
  }

  return (
    <section className="card">
      <div className="table-head">
        <h3>Transactions</h3>
        {state.role === 'admin' && (
          <button className="btn-primary" onClick={() => dispatch({ type: 'OPEN_MODAL' })}>
            + Add Transaction
          </button>
        )}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th className="align-right">Amount</th>
              {state.role === 'admin' && <th className="align-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {visibleTransactions.map((txn) => (
              <tr key={txn.id}>
                <td>{formatDate(txn.date)}</td>
                <td>{txn.description}</td>
                <td>{txn.category}</td>
                <td>
                  <span className={`pill ${txn.type}`}>{txn.type}</span>
                </td>
                <td className={`align-right amount ${txn.type}`}>
                  {txn.type === 'expense' ? '-' : '+'}
                  {formatCurrency(txn.amount)}
                </td>
                {state.role === 'admin' && (
                  <td className="align-right action-buttons">
                    <button
                      className="btn-link"
                      onClick={() => dispatch({ type: 'OPEN_MODAL', payload: txn.id })}
                    >
                      Edit
                    </button>
                    <button className="btn-link danger" onClick={() => onDelete(txn.id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
