module.exports = {
    mode: "jit",
    purge: ["./src/**/*.tsx"],
    darkMode: "media", // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
