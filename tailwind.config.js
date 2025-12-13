/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=forest]"],
          "--standard-text-color": "white",

          primary: "#ff6c15",

          secondary: "#2F2E31",

          accent: "#c10128",

          neutral: "#261726",

          "base-content": "#F5F5F5",

          "base-100": "#131319",

          info: "#3D75E6",

          success: "#111827",

          warning: "#9C6507",

          error: "#E63757",
        },
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "--standard-text-color": "black",
          primary: "#1eb854",
          secondary: "#2F2E31",
        },
      },
    ],
  },
};
