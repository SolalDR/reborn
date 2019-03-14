const webpack = require('webpack');

module.exports = {
  configureWebpack: {
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
