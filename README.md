# Finance Dashboard UI

Frontend-only finance dashboard built for the internship assignment.

## Overview

This project demonstrates a clean, responsive finance dashboard with:

- summary cards for balance, income, and expenses
- a balance trend visualization
- a category-based spending breakdown
- a searchable, filterable, sortable transaction table
- simulated roles for Viewer and Admin
- insights derived from transaction data
- local persistence with `localStorage`

## Tech Stack

- React (JavaScript)
- Vite
- Context API + `useReducer`
- Plain CSS for responsive UI

## Features Implemented

- Dashboard Overview with Summary Cards
- Time-Based Visualization (balance trend)
- Categorical Visualization (spending breakdown)
- Transaction List with date, amount, category, type
- Search, filtering, and sorting
- Role-Based UI (`viewer` and `admin`)
- Insights Section
- State Management with Context
- Responsive Design
- Empty-state handling
- Local storage persistence

## Project Structure

- `client/src/App.jsx` — page composition
- `client/src/context/AppContext.jsx` — global state + reducer
- `client/src/utils/finance.js` — totals, trend, breakdown, insights helpers
- `client/src/components/dashboard/*` — cards + charts
- `client/src/components/transactions/*` — toolbar, table, modal
- `client/src/components/insights/InsightsPanel.jsx` — insight cards
- `client/src/data/mockTransactions.js` — mock data
- `client/public/screenshots/*` — submission screenshots

## Run Locally

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## Screenshots

See [client/README.md](client/README.md) for embedded screenshots.

## Notes

- This is intentionally frontend-only per assignment scope.
- Role switching is simulated in UI, not backend-auth based.
- Visualizations are lightweight custom implementations for clarity and simplicity.
