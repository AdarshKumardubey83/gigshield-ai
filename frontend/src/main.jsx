import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/main.scss';
import axios from 'axios';

// ─── Global Axios Config ──────────────────────────────────────────────────────
// NO baseURL — requests go through the Vite proxy (/api → localhost:5000).
// Same-site via proxy = cookie is stored for :5173, re-sent on every /api call.
// withCredentials ensures the browser attaches cookies on every request.
axios.defaults.withCredentials = true;
// ─────────────────────────────────────────────────────────────────────────────

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
