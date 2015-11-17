import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const assetPath = require('path').join(__dirname, 'dist');

const resolve = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'actions': __dirname + '/src/actions/',
      'components': __dirname + '/src/components/',
      'constants': __dirname + '/src/constants/',
      'pages': __dirname + '/src/pages/',
      'reducers': __dirname + '/src/reducers/',
      'styles': __dirname + '/src/styles',
      'images': __dirname + '/src/public/images'
    }
  },
};

const lintLoaders  = {
  preLoaders: [{
    test: /\.js$/,
    exclude: [/node_module/, 'mock/*'],
    loader: 'eslint'
  }],
};

const jsLoaders = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel'
};

const loaders = [{
  test: /\.json$/,
  loader: 'json-loader'
}, {
  test: /\.(png|jpg|woff|woff2)$/,
  loader: 'url?limit=8192'
}];

const plugins = {
  development: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!fetch'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html.tpl',
      inject: 'body'
    })
  ],

  production: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html.tpl',
      inject: 'body'
    })
  ]
};

const development = {
  output: {
    path: assetPath,
    filename: 'main.js',
    publicPath: '/'
  },
  cache: true,
  debug: true,
  devtool: 'sourcemap',
  entry: [
    'webpack-hot-middleware/client',
    './src/main.js'
  ],
  stats: {
    colors: true,
    reasons: true
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  ...resolve,
  module: {
    ...lintLoaders,
    loaders: [{
      ...jsLoaders,
      query: {
        plugins: ['react-transform'],
        extra: {
          'react-transform': {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react']
            }]
          }
        }
      }
    },
      ...loaders
    ]
  },

  plugins: plugins.development
};

const production = {
  output: {
    path: assetPath,
    filename: 'main-[hash].js',
    publicPath: '/'
  },
  devtool: 'sourcemap',
  entry: [
    './src/main.js'
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  ...resolve,
  module: {
    ...lintLoaders,
    loaders: [{
      ...jsLoaders,
    },
      ...loaders
    ]
  },

  plugins: plugins.production
};


export { development, production}
