module.exports = {
    purge:
        // https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
        // only purgecss in production to speed up development build time
        ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                kleinBlue: '#337ab7',
                alizarinRed: '#EA2B2B',
                brightGreen: '#4fb802',
                solitudeBlue: '#DDE1E7',
            },
        },
    },
    variants: {},
    plugins: [],
};
