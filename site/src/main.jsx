import React from 'react';
import ReactDOM from 'react-dom/client';
// Token CSS: disalin dari design system via `npm run sync-ds` (ADR 0003).
import './design-system/styles.css';
import './global.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
