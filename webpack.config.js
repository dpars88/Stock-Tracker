var path = require('path');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css']
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015']
       }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      }
    ]
  }
};

// Still need to fix webpack for CSS Modules to work properly, need to finish reading docs, looking like I will start from scratch to ensure proper setup


// var path = require('path');

// module.exports = {
//   entry: path.resolve(__dirname, 'react-client', 'src', 'index.jsx'),
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   resolve: {
//     extensions: ['.jsx', '.js', '.json', '.css']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader'
//         }
//       },
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           {
//             loader: 'css-loader',
//             options: {
//               importLoaders: 1,
//               modules: true,
//               mode: 'development'
//             }
//           }
//         ]
//       }
//     ]
//   }
// };