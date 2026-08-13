import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';
import '@neondatabase/auth/ui/css';
import { Providers } from './providers';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><Providers><App/></Providers></BrowserRouter></React.StrictMode>);
