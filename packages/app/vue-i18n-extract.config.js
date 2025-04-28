module.exports = {
  vueFiles: './src/**/*.?(js|ts|vue)',
  languageFiles: './src/locales/**/*.json',
  output: './src/locales/missing-keys.json',
  add: true,
  separator: '.',
  exclude: ['node_modules', 'dist'],
}
