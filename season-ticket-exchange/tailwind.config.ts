import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      blue: "#0033a0",
      "dark-blue": colors.blue[900],
      red: "#c8102e",
      white: "#FFFFFF",
      green: colors.green[500],
      amber: colors.amber[500],
      yellow: colors.yellow[500],
      orange: colors.orange[500],
      gray: "#a8a8a8",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
