import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rosie-brown': ['var(--font-rosie-brown)', 'Times New Roman', 'serif'],
        'sans': ['Times New Roman', 'Georgia', 'Book Antiqua', 'serif'],
        'serif': ['Times New Roman', 'Georgia', 'Book Antiqua', 'serif'],
        'title': ['var(--font-rosie-brown)', 'Times New Roman', 'serif'],
        'body': ['Times New Roman', 'Georgia', 'Book Antiqua', 'serif'],
      },
      colors: {
        // Custom color palette
        dune: {
          light: "#FFFAE6", // Light cream for backgrounds
          gold: "#A0825E",  // Warm gold for buttons, accents
        },
        praia: "#7E7941",   // Olive green for secondary accents
        pine: "#95A7AF",    // Cool gray-blue for text, borders
        paddy: "#465C6B",   // Deep slate blue for headers, icons
        porto: "#15282A",   // Dark teal for backgrounds, primary color
        
        // shadcn/ui color system using custom colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--dune-light)",
        foreground: "var(--porto)",
        primary: {
          DEFAULT: "var(--dune-gold)",
          foreground: "var(--dune-light)",
        },
        secondary: {
          DEFAULT: "var(--praia)",
          foreground: "var(--dune-light)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "var(--pine)",
          foreground: "var(--paddy)",
        },
        accent: {
          DEFAULT: "var(--pine)",
          foreground: "var(--porto)",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config; 