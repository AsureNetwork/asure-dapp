const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { injectBabelPlugin, getLoader } = require('react-app-rewired');

const fileLoaderMatcher = function(rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) !== -1;
};

/*
 * The default configuration for create-react-app 2 apps does not
 * work (https://ant.design/docs/react/use-with-create-react-app#Customize-Theme).
 *
 * See issue https://github.com/ant-design/ant-design-mobile/issues/1997.
 * See example https://github.com/ant-design/antd-mobile-samples/blob/master/create-react-app/config-overrides.js#L46
 */
module.exports = function override(config, env) {
  // web3-provider-engine is es6 by default. They ship valid es5 though.
  // eth-block-tracker is es6 by default. They ship invalid es5 though (e.g contains "class").
  // TODO: web3-provider-engine should be updated to use newer eth-block-tracker
  // which itself should ship valid es5
  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};
  config.resolve.alias['web3-provider-engine'] =
    'web3-provider-engine/dist/es5';
  config.resolve.alias['eth-block-tracker'] = 'eth-block-tracker-es5';

  // custom manifest.json
  config.plugins.unshift(
    new WebpackPwaManifest({
      short_name: 'Asure dApp',
      name: 'Asure dApp - Rethink Insurance!',
      icons: [
        {
          src: path.resolve('src/content/asure.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512]
        }
      ],
      start_url: process.env.REACT_APP_START_URL,
      display: 'standalone',
      theme_color: '#eeeeee',
      background_color: '#eeeeee'
    })
  );

  // Add second entry point for desktop iphone mockup
  // See https://github.com/facebook/create-react-app/issues/1084
  config.entry = {
    index: config.entry,
    desktop: './src/desktop/desktop.js'
  };
  config.output.filename = 'static/js/[name].bundle.js';
  config.plugins = config.plugins.filter(
    plugin => !(plugin instanceof HtmlWebpackPlugin)
  );
  config.plugins.unshift(
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
      chunks: ['index']
    })
  );
  config.plugins.unshift(
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'desktop.html',
      template: 'public/desktop.html',
      chunks: ['desktop']
    })
  );

  // babel-plugin-import
  config = injectBabelPlugin(
    [
      'import',
      {
        libraryName: 'antd-mobile',
        //style: 'css',
        style: true // use less for customized theme
      }
    ],
    config
  );

  // customize theme
  config.module.rules[1].oneOf.unshift({
    test: /\.less$/,
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9' // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009'
            })
          ]
        }
      },
      {
        loader: require.resolve('less-loader'),
        options: {
          javascriptEnabled: true,
          // theme vars, also can use theme.js instead of this.
          modifyVars: require('./theme')
        }
      }
    ]
  });

  // css-modules
  config.module.rules[1].oneOf.unshift({
    test: /\.css$/,
    exclude: /node_modules|antd-mobile\.css/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          //modules: true,
          importLoaders: 1
          //localIdentName: '[local]___[hash:base64:5]'
        }
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9' // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009'
            })
          ]
        }
      }
    ]
  });

  // file-loader exclude
  let l = getLoader(config.module.rules, fileLoaderMatcher);
  l.exclude.push(/\.less$/);

  return config;
};
