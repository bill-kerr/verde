const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/**/*.{svelte,ts}', './src/**/*.html'],
	darkMode: false,
	mode: 'jit',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				instagram: '#E1306C',
				pinterest: '#E60023',
				gray: colors.coolGray,
				emerald: colors.emerald,
				lime: colors.lime,
			},
			spacing: {
				128: '32rem',
				172: '43rem',
			},
		},
	},
	variants: {
		extend: {},
	},
};
