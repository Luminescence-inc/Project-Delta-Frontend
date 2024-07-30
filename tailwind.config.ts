/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/modules/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          green: {
            primary: "#009254",
            hover: "#33A467",
            focused: "#009254",
            pressed: "#006F37",
            shd: "#CAEAD499",
            ttr: "#F4FBF6",
            shade0: "#000000",
            shade10: "#052011",
            shade20: "#003A1B",
            shade40: "#005427",
            shade50: "#00894C",
            shade70: "#64BD87",
            shade80: "#96D4AB",
            shade90: "#CAEAD4",
            shade95: "#E6F5EA",
          },
          red: {
            primary: "#FF2E2E",
            hover: "#FF5C5C",
            focused: "#FF2E2E",
            pressed: "#FF2E2E",
          },
          success: {
            primary: "#06C270",
            hover: "#39D98A",
            focused: "#06C270",
            pressed: "#06C270",
          },
          disabled: "#E1E3E2",
          disabled2: "#C4C7C6",
        },
        white: {
          100: "#fff",
          105: "#f4f9ff",
          106: "#f5f5f5",
          200: "#ccc",
          300: "#ebebebb6",
          400: "#777",
          401: "#cccccc48",
          500: "rgba(0,0,0,.1)",
          600: "rgba(255,255,255,0.08)",
        },
        dark: {
          100: "#000",
          102: "#252527",
          103: "#0000002e",
          104: "#00000047",
          105: "#000",
          106: "#00000096",
          200: "#16181d",
          300: "#312c3b",
          400: "#3e3749",
          500: "rgba(0,0,0,.4)",
        },
        gray: {
          100: "#828297",
          102: "#ccc",
          103: "#9090A7",
          200: "#f9f9f9",
          201: "#eaeaea",
        },
        red: {
          100: "rgb(255, 0, 0, .4)",
          102: "#FAEBEB",
          200: "#ff0000",
          300: "#cc0000",
          301: "#FF9F9F",
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
          102: "#67A2F1",
          200: "#0e2d52",
          201: "#f4fbfe",
          202: "#e7f2ff",
          203: "#f4f9ff",
          204: "#F6F8FA",
        },
        green: {
          100: "#22C55E",
          102: "#EAF1DA",
          105: "#228637",
          200: "rgba(34, 197, 94, 0.3)",
        },
        yellow: {
          100: "#F59E0B",
          102: "#F6E35D",
          103: "#DEB841",
          104: "#EFCE3F",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      fontFamily: {
        pp: ["var(--font-pp)"],
        os: ["var(--font-os)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [
    // @ts-expect-error
    ({ addUtilities }) => {
      addUtilities({
        ".enableBounceEffect": {
          transition: "all 0.1s",
          "&:target": {
            transform: "scale(0.90)",
          },
          "&:active": {
            transform: "scale(0.85)",
          },
        },
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      });
    },
    require("@tailwindcss/forms"),
  ],
};
