import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import { NotificationContextProvider } from './NotificationContext'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={new QueryClient()}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)