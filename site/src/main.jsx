import React from 'react';
import ReactDOM from 'react-dom/client';
// Token CSS design system, sumbernya di `src/design-system/` (ADR 0003, 0009).
import './design-system/styles.css';
import './global.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
