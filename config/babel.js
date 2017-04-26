module.exports = {
  presets: [
    ['es2015', { modules: false }],
    'stage-2',
    'flow'
  ],
  plugins: [
    ['transform-react-jsx', { pragma: 'h' }],
    ['transform-decorators-legacy']
  ]
}
