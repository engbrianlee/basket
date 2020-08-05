module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      spacing: {
        "18": "4.5rem",
      },
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/custom-forms")],
};
