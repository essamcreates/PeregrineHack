export default {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    // Add any other file types or paths you want to include.
  ],
  plugins: [],
  theme: {
    extend: {
      animation: {
        slide: "slide 2.5s linear infinite",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateY(100%)", opacity: 0.1 },
          "15%": { transform: "translateY(0)", opacity: 1 },
          "30%": { transform: "translateY(0)", opacity: 1 },
          "45%": { transform: "translateY(-100%)", opacity: 1 },
          "100%": { transform: "translateY(-100%)", opacity: 0.1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],

};



