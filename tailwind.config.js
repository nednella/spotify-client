/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xsm: '500px',
            // => @media (min-width: 640px) { ... }

            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            gradientColorStopPositions: {
                33: '33%',
                66: '66%',
                '100px': '100px',
                '200px': '200px',
                '300px': '300px',
                '400px': '400px',
                '500px': '500px',
                '25vh': '50vh',
                '50vh': '50vh',
                '75vh': '50vh',
            },
            animation: {
                'login-modal': 'pop-up 0.3s, fade-in 0.8s',
                slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
            },
            keyframes: {
                'pop-up': {
                    from: { transform: 'translate(-50%, -40%)' },
                    to: { transform: 'translate(-50%, -50%)' },
                },
                'fade-in': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                slideDown: {
                    from: { height: '0px' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                slideUp: {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0px' },
                },
            },
            gridTemplateColumns: {
                'playlist-table': '16px minmax(120px, 4fr) minmax(120px, 2fr) minmax(120px, 1fr)',
            },
        },
    },
    plugins: [],
}
