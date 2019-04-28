const webpack = require('webpack');

module.exports = {
  chainWebpack: (config) => {
    config.module.rule('js').exclude.add(/\.worker\.js$/);
  },
  configureWebpack: {
    output: {
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          test: /\.(glsl|vs|fs|vert|frag)$/,
          exclude: /node_modules/,
          use: [
            'raw-loader',
            'glslify-loader',
          ],
        },
        {
          test: /\.worker\.js$/,
          use: {
            loader: 'worker-loader',
            options: {
              inline: true,
              // publicPath: '/workers/'
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({ THREE: 'three' }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/core/main.scss";
        `,
      },
    },
  },
};
