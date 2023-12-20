/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";
import { COLORS } from "./src/themes";
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        PrimaryBackGround: COLORS.primary,
        SecondaryBackGround: COLORS.secondary,
        AccentFontColor: COLORS.accentBlue,
      },
    },
  },
  plugins: [],
});
