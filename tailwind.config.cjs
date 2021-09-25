const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/**/*.{svelte,ts}', './src/**/*.html'],
	darkMode: false,
	mode: 'jit',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
				hand: ['Gochi Hand', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				instagram: '#E1306C',
				pinterest: '#E60023',
				gray: colors.coolGray,
				emerald: colors.emerald,
				lime: colors.lime,
				blue: colors.sky,
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
