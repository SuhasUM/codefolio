import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const emptyForm = {
  date: '',
  description: '',
  category: '',
  type: 'expense',
  amount: ''
};

export default function TransactionFormModal() {
  const { state, dispatch, editingTransaction } = useAppContext();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        date: editingTransaction.date,
        description: editingTransaction.description,
        category: editingTransaction.category,
        type: editingTransaction.type,
        amount: String(editingTransaction.amount)
      });
    } else {
      setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    }
    setError('');
  }, [editingTransaction, state.ui.isModalOpen]);

  if (!state.ui.isModalOpen) return null;

  const close = () => dispatch({ type: 'CLOSE_MODAL' });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.description || !form.category || !form.amount) {
      setError('Please fill in all fields.');
      return;
    }

    const amount = Number(form.amount);
    if (Number.isNaN(amount) || amount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    const payload = {
      id: editingTransaction?.id || `tx-${Date.now()}`,
      date: form.date,
      description: form.description.trim(),
      category: form.category.trim(),
      type: form.type,
      amount
    };

    dispatch({ type: editingTransaction ? 'UPDATE_TRANSACTION' : 'ADD_TRANSACTION', payload });
  };

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
          <button className="btn-link" onClick={close}>
            ✕
          </button>
        </div>

        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            />
          </label>

          <label>
            Description
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="e.g. Freelance payment"
            />
          </label>

          <label>
            Category
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="e.g. Salary, Food"
            />
          </label>

          <label>
            Type
            <select
              value={form.type}
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <label>
            Amount
            <input
              type="number"
              min="1"
              value={form.amount}
              onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
              placeholder="0"
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={close}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingTransaction ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
