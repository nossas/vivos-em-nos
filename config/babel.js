module.exports = {
  presets: [
    ['env', { loose: true, modules: false }],
    'flow',
  ],
  plugins: [
    ['transform-react-jsx', { pragma: 'h' }],
    ['transform-decorators-legacy'],
    ['syntax-trailing-function-commas'],
    ['transform-object-rest-spread'],
  ],
}
