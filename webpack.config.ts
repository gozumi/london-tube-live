import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
// xxximport { InjectManifest } from 'workbox-webpack-plugin'

const config: webpack.Configuration = {
  mode: 'development',

  entry: ['react-hot-loader/patch', './src/client/index.tsx'],

  output: {
    filename: 'app.[hash].js',
    globalObject: 'this',
    path: path.join(__dirname, './dist/public')
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      client: path.resolve(__dirname, 'src/client'),
      ['web-workers']: path.resolve(__dirname, 'src/client/web-workers')
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        // exclude: /.+\.spec\.tsx?$/,
        loader: 'ts-loader',
        test: /\.tsx?$/
      },

      {
        enforce: 'pre',
        loader: 'source-map-loader',
        test: /\.js$/
      },
      {
        test: /\.worker\.ts$/,
        use: {
          loader: 'worker-loader',
          options: {
            name: 'WorkerName.[hash].js'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 }
          }
        ]
      }
    ]
  },

  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    hot: true,
    port: 3000
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      API_URL_BASE: process.env.NODE_ENV === 'development' ?
        JSON.stringify('http://localhost:5000/') : JSON.stringify('/')
    }),
    new CleanWebpackPlugin(['dist/public']),
    CopyWebpackPlugin([
      { from: './src/client/manifest.json' },
      { from : './src/client/_assets' }
      // xxx{ from: './src/client/notifications.json' }
    ])
    // new InjectManifest({
    //   // include: [/\.(html|css|png)$/],
    //   swSrc: './src/client/service-worker.js'
    // })
  ]
}

export default config
