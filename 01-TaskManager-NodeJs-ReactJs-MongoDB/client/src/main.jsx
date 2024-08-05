import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppContext from './AppContext.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <AppContext>
      <ToastContainer position="top-center" />
      <App />
    </AppContext>
  </QueryClientProvider>
)
