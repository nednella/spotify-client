import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import SessionProvider from './providers/SessionProvider'
import ModalProvider from './providers/ModalProvider'
import ToastProvider from './providers/ToastProvider'

import './main.css'
import App from './app/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <SessionProvider>
            <ModalProvider />
            <ToastProvider />
            <App />
        </SessionProvider>
    </BrowserRouter>
)
