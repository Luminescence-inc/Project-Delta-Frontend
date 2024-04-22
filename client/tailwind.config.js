/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          100: "#fff",
          105: "#f4f9ff",
          200: "#ccc",
          300: "#ebebebb6",
          400: "#777",
          500: "rgba(0,0,0,.1)",
          600: "rgba(255,255,255,0.08)",
        },
        dark: {
          100: "#000",
          102: "#252527",
          103: "#0000002e",
          104: "#00000047",
          105: "#000",
          200: "#16181d",
          300: "#312c3b",
          400: "#3e3749",
          500: "rgba(0,0,0,.4)",
        },
        gray: {
          100: "#828297",
          200: "#f9f9f9",
        },
        red: {
          100: "rgb(255, 0, 0, .4)",
          102: "#FAEBEB",
          200: "#ff0000",
          300: "#cc0000",
          305: "#ff4741",
          400: "#990000",
          500: "#660000",
          600: "#330000",
          700: "#000000",
        },
        orange: {
          100: "#FF8A65",
          200: "rgba(255, 138, 101, 0.3)",
          300: "#f99d52",
          301: "rgba(51, 30, 20, 1)",
        },
        blue: {
          100: "#3770fe",
          101: "#6b77f1",
          200: "#0e2d52",
          201: "#f4fbfe",
        },
        green: {
          100: "#22C55E",
          102: "#EAF1DA",
          105: "#228637",
          200: "rgba(34, 197, 94, 0.3)",
        },
        pink: {
          100: "#E4295D",
          102: "#FDDDF6",
          200: "rgba(228, 41, 93, 0.3)",
        },
        purple: {
          100: "#8f63f3",
          105: "rgb(143, 99, 243,.3)",
        },
        teal: {
          100: "#17BEBB",
          200: "rgba(33, 182, 162, 0.3)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        custom: "0 2px 2px -2px rgba(0, 0, 0, 0.2)",
      },
      fontFamily: {
        pp: ["var(--font-pp)"],
        hnL: ["var(--font-hn-light)"],
        hnM: ["var(--font-hn-medium)"],
        hnB: ["var(--font-hn-bold)"],
      },
    },
  },
  plugins: [],
};
