/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'scan': 'scan 2s linear infinite',
                'grid-pulse': 'grid-pulse 5s ease-in-out infinite',
                'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                scan: {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '50%': { opacity: '1' },
                    '100%': { transform: 'translateY(100%)', opacity: '0' },
                },
                'grid-pulse': {
                    '0%, 100%': { opacity: '0.1' },
                    '50%': { opacity: '0.25' },
                }
            }
        },
    },
    plugins: [],
}
