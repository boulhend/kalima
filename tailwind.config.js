module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        slideIn: "slideIn 0.2s ease-in-out",
        slideOut: "slideOut 0.2s ease-in-out",
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateY(-30px)",
            opacity: 0,
          },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
        slideOut: {
          "0%": { transform: "translateY(0px)", opacity: 1 },
          "100%": { transform: "translateY(-60px)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
