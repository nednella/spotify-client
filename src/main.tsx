import React from 'react'
import ReactDOM from 'react-dom/client'

import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <>
            <div className='flex h-full w-full flex-col items-center justify-center'>
                <h1 className='text-3xl font-semibold text-white'>Spotify Web Player</h1>
            </div>
        </>
    </React.StrictMode>
)
