// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/JSX/TS/TSX files in src for Tailwind classes
    ],
    theme: {
        extend: {}, // Add custom theme extensions here (e.g., custom colors, fonts)
    },
    plugins: [], // Add Tailwind plugins here if needed
};