import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const root = createRoot(document.getElementById('root'))
const queryClient = new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
