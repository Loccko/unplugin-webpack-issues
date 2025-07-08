const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const VueI18nPlugin = require('@intlify/unplugin-vue-i18n/lib/webpack.cjs');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@intlify/vue-i18n-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash][ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    VueI18nPlugin({
      runtimeOnly: false,
      compositionOnly: false,
      include: [
        path.resolve(__dirname, 'src/**/*.vue'),
        path.resolve(__dirname, 'src/**/*.json'),
      ],
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: true,
      __INTLIFY_PROD_DEVTOOLS__: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      title: 'unplugin-ticket-demo',
      templateParameters: {
        BASE_URL: '/',
      },
    }),
  ],
  devtool: 'source-map',
};
