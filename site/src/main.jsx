import React from 'react';
import ReactDOM from 'react-dom/client';
// Token CSS + komponen diimpor langsung dari design system — bukan disalin.
import '../../New Surau Bateh Lori Design System/styles.css';
import './global.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
