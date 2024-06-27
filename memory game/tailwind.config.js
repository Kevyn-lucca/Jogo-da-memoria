/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				Bebas: ["BebasNeue-Regular", "system-ui", "sans-serif"],
			},
		},
		// eslint-disable-next-line no-undef
		plugins: [require("@tailwindcss/typography")],
	},
};
