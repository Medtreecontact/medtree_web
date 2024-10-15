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
  		colors: {
  			// background: 'var(--background)',
  			foreground: 'var(--foreground)',
			primary: '#1786A3',
			secondary: '#939393',
			error: '#f24f1e',
			background: '#fbfdff',
			// example of a color with multiple shades
			// 'tahiti': {
			// 	100: '#cffafe',
			// 	200: '#a5f3fc',
			// 	300: '#67e8f9',
			// 	400: '#22d3ee',
			// 	500: '#06b6d4',
			// 	600: '#0891b2',
			// 	700: '#0e7490',
			// 	800: '#155e75',
			// 	900: '#164e63',
			// },
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
