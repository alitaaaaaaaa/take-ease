import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ease:{paper:'#FAF8F4', sand:'#F5EEDC', ink:'#3A3A3A', blue:'#89A8B2', sage:'#A3B18A', mist:'#D6CFC7'} },
      fontFamily: { sans:['var(--font-sans)','system-ui','sans-serif'], serif:['var(--font-serif)','Georgia','serif'] },
      boxShadow: { soft:'0 24px 80px rgba(58,58,58,.12)' }
    }
  },
  plugins: []
};
export default config;
