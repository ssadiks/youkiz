import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import autoprefixer from 'autoprefixer';

const resolve = dir => path.resolve(__dirname, dir);

const postcss = (loader) => [
    autoprefixer({ browsers: ['last 4 versions'] })
];

const config = {
    entry:  {
        bundle: resolve('./src/index.jsx'),
        vendors: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-dom', 'redux', 'redux-thunk', 'material-ui'],
    },
    output: {
        filename: '[name].js',
        path: resolve('./public')
    },
    resolve: {
        extensions: ['.js', '.jsx']
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
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: postcss
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            })
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file-loader',
            options: {
                name: 'assets/images/[name].[ext]'
            }
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=assets/fonts/[name].[ext]'
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new CommonsChunkPlugin({
            names: ['vendors'],
            minChunks: Infinity
        })
    ]
};

module.exports = config;
