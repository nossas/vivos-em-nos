module.exports = {
	presets: [
		['es2015', {loose: true, modules: false}],
		'stage-2',
		'flow'
	],
	plugins: [
		['transform-decorators-legacy'],
		['transform-react-jsx', {pragma: 'h'}]
	]
};
