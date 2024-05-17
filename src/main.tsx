import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import ModalProvider from './providers/ModalProvider'

import './main.css'
import App from './app/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ModalProvider />
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
