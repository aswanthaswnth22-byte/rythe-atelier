import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        rythe: {
          plum: "#35243A",
          bone: "#F5F0EA",
          obsidian: "#101014",
          graphite: "#29292F",
          chrome: "#B8BAC1",
          violet: "#9B72D5"
        }
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
