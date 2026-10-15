import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds
        background: {
          DEFAULT: "#FAFAFA",
          secondary: "#F5F5F0",
          card: "#FFFFFF",
        },
        // Text colors
        foreground: {
          DEFAULT: "#1A1A1A",
          secondary: "#6B6B6B",
          muted: "#9B9B9B",
        },
        // Accent
        accent: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          light: "#DBEAFE",
        },
        // Semantic
        destructive: "#DC2626",
        success: "#16A34A",
        warning: "#F59E0B",
        // Admin
        admin: {
          bg: "#F8F9FA",
          sidebar: "#FFFFFF",
        },
        // Borders
        border: {
          DEFAULT: "rgba(0,0,0,0.06)",
          strong: "rgba(0,0,0,0.12)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        display: ["DM Serif Display", "Georgia", "serif"],
      },
      fontSize: {
        // Hero headings: 56-72px
        "hero-lg": ["72px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "hero": ["56px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        // Section headings: 36-44px
        "section-lg": ["44px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "section": ["36px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        // Product titles: 18-22px
        "product-lg": ["22px", { lineHeight: "1.3" }],
        "product": ["18px", { lineHeight: "1.3" }],
        // Body text: 15-16px
        "body-lg": ["16px", { lineHeight: "1.6" }],
        "body": ["15px", { lineHeight: "1.6" }],
        // Captions/labels: 12-13px
        "caption": ["13px", { lineHeight: "1.4", letterSpacing: "0.1em" }],
        "caption-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      spacing: {
        // 8px grid system
        "1": "8px",
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "5": "40px",
        "6": "48px",
        "7": "56px",
        "8": "64px",
        "9": "72px",
        "10": "80px",
        "12": "96px",
        "14": "112px",
        "15": "120px",
        "18": "144px",
      },
      maxWidth: {
        content: "1440px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)",
        modal: "0 4px 16px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.08)",
        drawer: "-4px 0 24px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "premium-hover": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
        "fade-up": "fade-up 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        "count-up": "count-up 0.5s ease-out",
        pulse: "pulse 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
