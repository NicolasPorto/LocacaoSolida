import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'flowbite'
import { AuthProvider } from './context/AuthContext';
import { CorretorProvider } from './context/CorretorContext';
import { ParteEnvolvidaProvider } from './context/ParteEnvolvidaContext';
import { ImovelProvider } from './context/ImovelContext';
import { ValorFixoProvider } from './context/ValorFixoContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <CorretorProvider>
            <ParteEnvolvidaProvider>
              <ImovelProvider>
                <ValorFixoProvider>
                  <App />
                </ValorFixoProvider>
              </ImovelProvider>
            </ParteEnvolvidaProvider>
          </CorretorProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>,
);
