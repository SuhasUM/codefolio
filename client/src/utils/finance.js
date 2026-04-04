const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value || 0);
}

export function formatDate(dateString) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
}

export function getSummary(transactions) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return {
    income,
    expenses,
    totalBalance: income - expenses
  };
}

export function getUniqueCategories(transactions) {
  return [...new Set(transactions.map((t) => t.category).filter(Boolean))].sort();
}

export function applyFiltersAndSort(transactions, filters, sort) {
  const filtered = transactions.filter((t) => {
    const search = filters.search?.trim().toLowerCase() || '';
    const matchesSearch =
      !search ||
      t.description.toLowerCase().includes(search) ||
      t.category.toLowerCase().includes(search);

    const matchesType = filters.type === 'all' || t.type === filters.type;
    const matchesCategory = filters.category === 'all' || t.category === filters.category;
    const matchesMonth =
      filters.month === 'all' ||
      new Date(t.date).toISOString().slice(0, 7) === filters.month;

    return matchesSearch && matchesType && matchesCategory && matchesMonth;
  });

  return filtered.sort((a, b) => {
    let compare = 0;

    if (sort.by === 'amount') {
      compare = Number(a.amount) - Number(b.amount);
    } else {
      compare = new Date(a.date) - new Date(b.date);
    }

    return sort.order === 'asc' ? compare : -compare;
  });
}

export function getMonthlyTrend(transactions) {
  const monthMap = new Map();

  transactions.forEach((t) => {
    const dt = new Date(t.date);
    if (Number.isNaN(dt.getTime())) return;
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;

    if (!monthMap.has(key)) {
      monthMap.set(key, { income: 0, expenses: 0 });
    }

    const monthData = monthMap.get(key);
    if (t.type === 'income') monthData.income += Number(t.amount || 0);
    if (t.type === 'expense') monthData.expenses += Number(t.amount || 0);
  });

  let runningBalance = 0;
  return [...monthMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => {
      const [year, month] = key.split('-');
      const net = value.income - value.expenses;
      runningBalance += net;

      return {
        key,
        month: `${MONTH_NAMES[Number(month) - 1]} ${String(year).slice(2)}`,
        income: value.income,
        expenses: value.expenses,
        net,
        balance: runningBalance
      };
    });
}

export function getCategoryBreakdown(transactions) {
  const categories = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount || 0);
      return acc;
    }, {});

  const total = Object.values(categories).reduce((s, v) => s + v, 0);

  return Object.entries(categories)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total ? (amount / total) * 100 : 0
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getInsights(transactions) {
  const breakdown = getCategoryBreakdown(transactions);
  const highest = breakdown[0] || null;

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

  const monthlyExpense = (monthKey) => transactions
    .filter((t) => t.type === 'expense' && t.date?.slice(0, 7) === monthKey)
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const currentExpenses = monthlyExpense(currentMonth);
  const previousExpenses = monthlyExpense(previousMonth);

  const monthlyChange = previousExpenses === 0
    ? (currentExpenses > 0 ? 100 : 0)
    : ((currentExpenses - previousExpenses) / previousExpenses) * 100;

  const averageTransaction = transactions.length
    ? transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0) / transactions.length
    : 0;

  return {
    highestCategory: highest,
    monthlyComparison: {
      currentMonth,
      previousMonth,
      currentExpenses,
      previousExpenses,
      monthlyChange
    },
    averageTransaction
  };
}
