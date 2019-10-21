const path = require('path')

module.exports = {
    entry: path.join(__dirname, '/client/index.js'),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader']
       
        }
      ]
    },
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/client/public')},
  };