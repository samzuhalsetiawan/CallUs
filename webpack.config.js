const path = require('path')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './public/javascript/fbInit.js',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: 'fb.js',
    path: path.resolve(__dirname, 'public/javascript')
  }
}