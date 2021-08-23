const path = require("path");

const config = {
    mode: "none",
    entry: {
      'jwt-check-expiry': './src/index.ts',
      'jwt-check-expiry.min': './src/index.ts'
    },
    output: {
      path: path.resolve(__dirname, 'bundles'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'jwt-check-expiry',
      umdNamedDefine: true
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    module: {
    rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
  }

  module.exports = config;
