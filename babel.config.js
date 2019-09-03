module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-env',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    [
      'transform-react-remove-prop-types',
      {
        mode: 'remove',
        ignoreFilenames: ['node_modules'],
      },
    ],
    ['babel-plugin-root-import', {
      rootPathSuffix: './src/',
      rootPathPrefix: '~/',
    }],
    ['@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
};
