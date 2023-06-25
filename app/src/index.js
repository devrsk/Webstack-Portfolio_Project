import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyles } from './global-styles';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <Router>
    <GlobalStyles />
    <App />
  </Router>
);