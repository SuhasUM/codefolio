import { createContext, useContext, useMemo, useReducer, useEffect } from 'react';
import { mockTransactions } from '../data/mockTransactions';
import {
  applyFiltersAndSort,
  getCategoryBreakdown,
  getInsights,
  getMonthlyTrend,
  getSummary,
  getUniqueCategories
} from '../utils/finance';

const AppContext = createContext(null);
const STORAGE_KEY = 'finance-dashboard-state-v1';

const initialState = {
  transactions: mockTransactions,
  role: 'viewer',
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    month: 'all'
  },
  sort: {
    by: 'date',
    order: 'desc'
  },
  ui: {
    isModalOpen: false,
    editingId: null
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'SET_SORT':
      return { ...state, sort: { ...state.sort, ...action.payload } };

    case 'OPEN_MODAL':
      return {
        ...state,
        ui: {
          isModalOpen: true,
          editingId: action.payload || null
        }
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        ui: {
          isModalOpen: false,
          editingId: null
        }
      };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        ui: { isModalOpen: false, editingId: null }
      };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        ui: { isModalOpen: false, editingId: null }
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload)
      };

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        transactions: action.payload.transactions || state.transactions,
        role: action.payload.role || state.role
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: JSON.parse(saved) });
      }
    } catch (error) {
      console.error('Failed to load local data:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ transactions: state.transactions, role: state.role })
    );
  }, [state.transactions, state.role]);

  const computed = useMemo(() => {
    const visibleTransactions = applyFiltersAndSort(
      [...state.transactions],
      state.filters,
      state.sort
    );

    return {
      visibleTransactions,
      summary: getSummary(state.transactions),
      monthlyTrend: getMonthlyTrend(state.transactions),
      categoryBreakdown: getCategoryBreakdown(state.transactions),
      insights: getInsights(state.transactions),
      categories: getUniqueCategories(state.transactions),
      months: [...new Set(state.transactions.map((t) => t.date.slice(0, 7)))].sort().reverse(),
      editingTransaction:
        state.transactions.find((t) => t.id === state.ui.editingId) || null
    };
  }, [state]);

  const value = useMemo(() => ({ state, dispatch, ...computed }), [state, computed]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
