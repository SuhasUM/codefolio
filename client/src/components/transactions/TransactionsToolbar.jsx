import { useAppContext } from '../../context/AppContext';

export default function TransactionsToolbar() {
  const { state, dispatch, categories, months } = useAppContext();

  const updateFilter = (payload) => dispatch({ type: 'SET_FILTERS', payload });
  const updateSort = (payload) => dispatch({ type: 'SET_SORT', payload });

  return (
    <div className="toolbar card">
      <input
        type="text"
        placeholder="Search description or category"
        value={state.filters.search}
        onChange={(e) => updateFilter({ search: e.target.value })}
      />

      <select value={state.filters.type} onChange={(e) => updateFilter({ type: e.target.value })}>
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={state.filters.category} onChange={(e) => updateFilter({ category: e.target.value })}>
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={state.filters.month} onChange={(e) => updateFilter({ month: e.target.value })}>
        <option value="all">All months</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <select value={state.sort.by} onChange={(e) => updateSort({ by: e.target.value })}>
        <option value="date">Sort by date</option>
        <option value="amount">Sort by amount</option>
      </select>

      <select value={state.sort.order} onChange={(e) => updateSort({ order: e.target.value })}>
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
}
