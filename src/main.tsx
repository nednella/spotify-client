import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AuthProvider from './providers/AuthProvider'
import ModalProvider from './providers/ModalProvider'
import ToastProvider from './providers/ToastProvider'
import LibraryProvider from './providers/LibraryProvider'

import { getAvailableDevices } from './hooks/usePlayer'

import './main.css'
import App from './app/App'

const queryClient = new QueryClient()

// Spotify Web Playback SDK download
const script = document.createElement('script')
script.src = 'https://sdk.scdn.co/spotify-player.js'
script.async = true
document.body.appendChild(script)

// Refresh devices
document.addEventListener('visibilitychange', () => {
    if (document.hidden) return
    getAvailableDevices()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AuthProvider>
                <ModalProvider />
                <ToastProvider />
                <LibraryProvider>
                    <App />
                </LibraryProvider>
            </AuthProvider>
        </BrowserRouter>
    </QueryClientProvider>
)
