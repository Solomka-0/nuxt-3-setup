/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js}",
        "./src/**/*.{css,sass,scss}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        screens: {
            sm: "375px",
            md: "720px",
            lg: "920px",
            xl: "1110px"
        },

        container: {
            center: true,

            screens: {

                DEFAULT : "100%",
                lg      : "1100px",
            },
            padding: {
                DEFAULT : "1rem",
                lg      : "0.625rem",
            },
        },

        extend: {
            fontSize: {
                'xs/sm': '0.8125rem',
                'sm/base': '0.9375rem',
                '1/2xl': '1.375rem',
                '2/3xl': '1.75rem',
            }
        },
    },
    plugins: [],
}

