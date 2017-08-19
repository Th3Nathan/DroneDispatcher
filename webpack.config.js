
var path = require("path");
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  context: __dirname,
  entry: "./scripts/main.js",
  target: 'node',
  node: {
   fs: "empty"
  },
  output: {
    path: path.resolve(__dirname, 'scripts'),
    filename: "server.js"
  },
  devtool: 'source-maps',
  externals: nodeModules,
  resolve: {
    extensions: [".js", "*"]
  }
};
