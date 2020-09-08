"use strict";
const path = require("path");
// const webpack = require('webpack')
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const defaultSettings = require('./src/config')
const productionGzipExtensions = ["js", "css"];
const isProduction = process.env.NODE_ENV === "production";
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const cdn = {
  // css: ['xxx.css', 'sss.js'],
  js: [
    "https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.js",
    "https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.1/vue-router.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/vuex/3.0.1/vuex.min.js",
    "//webapi.amap.com/maps?v=1.4.15&key=08a5f5ad200e8743d05eeaf24990cfc9&plugin=AMap.Geocoder,AMap.Geolocation"
  ]
};
function resolve(dir) {
  return path.join(__dirname, dir);
}
console.log(process.env.NODE_ENV, process.env.VUE_APP_FLAG);
console.log(process.env.ANALYZE);
console.log(process.argv);
const name = "天空之城影云" || "vue Admin Template"; // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 9528; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  runtimeCompiler: true,
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: true,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      "/api": {
        target: 'https://tkzc-develop-cloud.zmaxfilm.com',
        // target: "https://tkzc-release-cloud.zmaxfilm.com",
        changeOrigin: true, // set the option changeOrigin to true for name-based virtual hosted sit
        // pathRewrite: { '^/api': '' },
        secure: false
      }
    }
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: config => {
    config.performance = {
      hints: false
    };
    config.name = name;
    if (process.env.NODE_ENV !== "development") {
      config.externals = {
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        AMap: "AMap"
        // 'element-ui': 'ELEMENT',
      };
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      );
      // config.plugins.push(
      //   new webpack.DllReferencePlugin({
      //     context: process.cwd(),
      //     manifest: require('./public/vendor/vendor-manifest.json')
      //   })
      // )
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       warnings: false,
      //       compress: {
      //         drop_debugger: true,
      //         drop_console:
      //           isProduction &&
      //           process.env.VUE_APP_FLAG !== 'test' &&
      //           process.env.NODE_ENV !== 'development'
      //       }
      //     },
      //     sourceMap: true,
      //     parallel: true
      //   })
      // )
    } else {
      config.externals = {
        AMap: "AMap"
      };
    }
  },
  transpileDependencies: ["resize-detector"],
  chainWebpack(config) {
    if (isProduction) {
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }
    config.module.rule('eslint').use('eslint-loader')
    if (process.env.ANALYZE) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    // config.module
    //   .rule('ts-loader')
    //   .test(/\.tsx?$/)
    //   .exclude.add(resolve('node_modules'))
    //   .end()
    //   .use('ts-loader')
    //   .loader('ts-loader')
    //   .options({
    //     appendTsSuffixTo: [/\.vue$/]
    //   })
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"));
    config.resolve.alias.set("styles", path.resolve(__dirname, "./src/styles"));
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(isProduction && process.env.VUE_APP_FLAG === "test", config =>
        config.devtool("cheap-source-map")
      );

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  },
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
  }
};
