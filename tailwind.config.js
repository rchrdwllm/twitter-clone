module.exports = {
    mode: "jit",
    purge: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Chirp Regular", "Inter", "sans-serif"],
                heading: ["ChirpExtended Heavy", "Inter", "sans-serif"],
                emphasis: ["Chirp Bold", "Inter", "sans-serif"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
