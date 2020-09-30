module.exports ={
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' ?
    require('cssnano')({
			// use the safe preset so that it doesn't
			// mutate or remove code from our css
			preset: 'default',
		}) : null
  ]
};
