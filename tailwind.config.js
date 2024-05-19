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
            },
            animation: {
                'login-modal': 'pop-up 0.3s, fade-in 0.8s',
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
            },
        },
    },
    plugins: [],
}
