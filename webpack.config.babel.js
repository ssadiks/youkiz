import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import autoprefixer from 'autoprefixer';
import { LOCALES } from './src/constants';
// import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const resolve = dir => path.resolve(__dirname, dir);

const postcss = (loader) => [
  autoprefixer({ browsers: ['last 4 versions'] })
];

// const BUILD_DIR = resolve('./public');
const APP_DIR = resolve('./src');
const ROOT_DIR = resolve('./');
const PORT = '8080';

const devServer = process.env.NODE_ENV === 'development' ? {
  publicPath: `http://localhost:${PORT}/`,
  contentBase: 'public',
  historyApiFallback: true,
  compress: true,
  port: PORT,
} : null;

const config = {
  entry: {
    bundle: [resolve('./src/index.jsx'), resolve('./src/style/style.scss')],
    vendors: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-dom', 'redux', 'redux-thunk', 'material-ui'],
  },
  output: {
    filename: 'js/[name].js',
    path: resolve('./public'),
    publicPath: `http://localhost:${PORT}/`
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '*': 'react',
      '@App': resolve('src/'),
      '@Container': resolve('src/components/container'),
      '@Presentational': resolve('src/components/presentational'),
      '@Action': resolve('src/redux/actions'),
      '@Reducer': resolve('src/redux/reducers'),
      '@Asset': resolve('src/assets'),
      '@Api': resolve('src/api'),
    }
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.s?css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcss
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      })
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: 'assets/images/[hash].[ext]'
          }
        }
      ],
      include: [
        `${APP_DIR}/assets/images`,
        `${APP_DIR}/components`
      ],
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            minetype: 'application/font-woff',
            name: 'assets/fonts/[hash].[ext]'
          }
        }
      ]
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[hash].[ext]'
          }
        },
        {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      ],
      exclude: `${ROOT_DIR}/node_modules/react-flags-select/flags/`,
    }, {
      test: /flags\/[a-z]{2,}\.(svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'assets/images/flags/[name].[ext]',
            emitFile: false
          }
        }
      ]
    }, {
      test: /\.(svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'assets/images/flags/[name].[ext]'
          }
        }
      ],
      exclude: new RegExp(`flags/((?!${LOCALES.join('|')}))([a-z]{2,}).svg$`, 'i'),
    }]
  },
  plugins: [
    new ExtractTextPlugin('css/style.css'),
    new CommonsChunkPlugin({
      names: ['vendors'],
      minChunks: Infinity
    }),
    // new UglifyJSPlugin()
    new HtmlWebpackPlugin({
      template: `${APP_DIR}/index.tpl.ejs`,
      chunks: ['bundle', 'vendors']
    })
  ],
  devServer
};

module.exports = config;
