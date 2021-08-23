const path = require("path");

const config = {
    mode: "production",
    entry: {
      'jwt-check-expiry.min': './src/index-standalone.ts'
    },
    output: {
      path: path.resolve(__dirname, 'lib'),
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
