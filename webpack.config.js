const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "fs": false 
    }
  }
};
