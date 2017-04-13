module.exports = {
	presets: [
		['es2015', {loose: true, modules: false}],
		'stage-2'
	],
	plugins: [
		['transform-decorators-legacy'],
		['transform-react-jsx', {pragma: 'h'}]
	]
};
