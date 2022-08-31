module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
      development: {
        plugins: [
          [
            'module-resolver',
            {
              extensions: [
                '.js',
                '.jsx',
                '.ts',
                '.tsx',
                '.android.js',
                '.android.tsx',
                '.ios.js',
                '.ios.tsx',
              ],
              alias: {'@app': './src/'},
              // root: ['./src'],
            },
          ],
          'react-native-reanimated/plugin',
        ],
      }
    },
  };
};
