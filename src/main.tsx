import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import ModalProvider from './providers/ModalProvider'
import ToastProvider from './providers/ToastProvider'

import './main.css'
import App from './app/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ModalProvider />
        <ToastProvider />
        <App />
    </BrowserRouter>
)
