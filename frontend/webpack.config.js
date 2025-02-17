const path = require('path');

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:metro-react-native-babel-preset'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
  },
};
