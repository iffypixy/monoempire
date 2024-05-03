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
                    sm: "0 0 10px rgb(0 0 0 / 0.1)",
                    md: "0 0 20px rgb(0 0 0 / 0.1)",
                    lg: "0 0 50px rgb(0 0 0 / 0.1)",
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
                    DEFAULT: "rgb(var(--primary-color) / <alpha-value>)",
                    contrast: "var(--primary-color-contrast)",
                },
                secondary: {
                    DEFAULT: "rgb(var(--secondary-color) / <alpha-value>)",
                    contrast: "var(--secondary-color-contrast)",
                },
                accent: {
                    DEFAULT: "rgb(var(--accent-color) / <alpha-value>)",
                    contrast:
                        "rgb(var(--accent-color-contrast) / <alpha-value>)",
                },
                success: {
                    DEFAULT: "var(--success-color)",
                },
                error: {
                    DEFAULT: "var(--error-color)",
                },
                paper: {
                    primary: "rgb(var(--paper-primary) / <alpha-value>)",
                    secondary: "var(--paper-secondary)",
                    contrast: "rgb(var(--paper-contrast) / <alpha-value>)",
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
    plugins: [require("tailwindcss-animate")],
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
