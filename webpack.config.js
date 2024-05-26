import path from 'path'
const __dirname = process.cwd()

module.exports = {
  entry: './src/index.js', // El punto de entrada de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // El nombre del archivo de salida
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
