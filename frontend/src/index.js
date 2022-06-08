import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ContextProvider } from './context/Context';

import 'bootstrap/dist/css/bootstrap.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* App 내의 모든 Component에서 value 사용 가능 */}
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);


