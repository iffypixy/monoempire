export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            body: "Unbounded, cursive",
        },
        extend: {
            fontSize: {
                body: "1rem",
            },
            boxShadow: flatten({
                even: {
                    lg: "0 0 50px -1px rgb(0 0 0 / 0.1)",
                },
            }),
            keyframes: {
                "slide-down-and-fade": {
                    from: {opacity: 0, transform: "translateY(-20px)"},
                    to: {opacity: 1, transform: "translateY(0)"},
                },
                "text-shine": {
                    from: {
                        backgroundPosition: "0% 50%",
                    },
                    to: {
                        backgroundPosition: "100% 50%",
                    },
                },
            },
            animation: {
                "slide-down-and-fade":
                    "slide-down-and-fade 1s cubic-bezier(0.16, 1, 0.3, 1)",
                "text-shine": "text-shine 1s ease-in-out infinite alternate",
            },
            backgroundImage: {
                home: "var(--home-bg)",
            },
            colors: {
                primary: {
                    DEFAULT: "var(--primary-color)",
                    contrast: "var(--primary-color-contrast)",
                },
                secondary: {
                    DEFAULT: "var(--secondary-color)",
                    contrast: "var(--secondary-color-contrast)",
                },
                accent: {
                    DEFAULT: "var(--accent-color)",
                    contrast: "var(--accent-color-contrast)",
                },
                error: {
                    DEFAULT: "var(--error-color)",
                },
                paper: {
                    primary: "var(--paper-primary)",
                    secondary: "var(--paper-secondary)",
                    contrast: "var(--paper-contrast)",
                },
            },
        },
        screens: {
            "2xl": {
                max: "1632px",
            },
            xl: {
                max: "1344px",
            },
            lg: {
                max: "1056px",
            },
            md: {
                max: "768px",
            },
            sm: {
                max: "480px",
            },
        },
    },

    plugins: [],
};

function flatten(theme) {
    const flat = {};

    function recurse(object, prefix = "") {
        for (const prop in object) {
            if (typeof object[prop] === "object") {
                recurse(object[prop], `${prefix}${prop}-`);
            } else {
                const key = `${prefix}${prop}`;

                flat[key] = object[prop];
            }
        }
    }

    recurse(theme);

    return flat;
}
