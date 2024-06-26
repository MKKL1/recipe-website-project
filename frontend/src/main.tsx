import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {NotificationProvider} from "./contexts/NotificationContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <NotificationProvider>
            <AuthProvider>
              <App/>
          </AuthProvider>
      </NotificationProvider>
  </React.StrictMode>,
)
