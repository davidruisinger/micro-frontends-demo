module.exports = {
  parser: 'typescript',
  printWidth: 80,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  jsxBracketSameLine: false,
  overrides: [
    {
      files: '*.graphql',
      options: {
        parser: 'graphql',
      },
    },
  ],
}
