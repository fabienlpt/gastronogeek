import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colors,
      custom: {
        red: "#FF4E6F",
        pink: "#FF8CFF",
        green: "#00FF8E",
        blue: "#94C9FF",
      },
    },
  },
  plugins: [],
};

export default config;
