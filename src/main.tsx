import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AuthProvider from './providers/AuthProvider'
import ModalProvider from './providers/ModalProvider'
import ToastProvider from './providers/ToastProvider'

import './main.css'
import App from './app/App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <BrowserRouter>
                <ModalProvider />
                <ToastProvider />
                <App />
            </BrowserRouter>
        </AuthProvider>
    </QueryClientProvider>
)
