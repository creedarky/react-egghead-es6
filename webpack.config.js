module.exports = {
  entry: './main.js',
  output: {
    path: './',
    filename: 'index.js',
    sourceMapFilename: 'index.map'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  devtool: "#source-map",

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }

      }
    ]
  }
};
