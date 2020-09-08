/* eslint-disable */
// "report": "ANALYZE=true vue-cli-service build"
// "zmax-company-components": "^1.0.6"

// npm config set registry http://192.168.81.5:8081/repository/npm-all/

// vue-cli生成的项目，已配置
// ES6代码转换成ES5代码
// scss/sass/less/stylus转css
// .vue文件转换成js文件
// 使用 jpg、png，font等资源文件
// 自动添加css各浏览器产商的前缀
// 代码热更新
// 资源预加载
// 每次构建代码清除之前生成的代码
// 定义环境变量
// 区分开发环境打包跟生产环境打包
const name = '测试模板' || 'vue Template' // 页面标题
const isProduction = process.env.NODE_ENV === 'production'
const productionGzipExtensions = ['js', 'css']
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const port = 9528 // dev port 默认端口号
const cdn = {  //引入稳定版本的cdn，非必须依赖配置时，本地的package.json中要配置相同的版本的依赖，比如element-ui，echarts ，AMap等
    js: [
        // 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.js',
        'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.13.0/index.js',
        'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.1/vue-router.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.0.1/vuex.min.js'
        // '//webapi.amap.com/maps?v=1.4.15&key=08a5f5ad200e8743d05eeaf24990cfc9&plugin=AMap.Geocoder,AMap.Geolocation'
    ]
}
console.log('cdn', cdn)
module.exports = {
    // baseUrl 从 Vue CLI 3.3 起已弃用，请使用publicPath
    publicPath: process.env.NODE_ENV === 'production' ? '/配置的根目录地址' : '/', //默认值'/'  （公共路径）
    // 部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致，
    // 但是 Vue CLI 在一些其他地方也需要用到这个值，
    // 所以请始终使用 publicPath 而不要直接修改 webpack 的 output.publicPath。
    // 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，
    // 这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。
    // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
    // 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
    outputDir: 'dist', // 或 'dist/xxx'  （出口目录）
    // 出口文件夹名称，当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 
    // 请始终使用 outputDir 而不要修改 webpack 的 output.path
    assetsDir: 'static', //默认''，可根据需求配置  （资源目录）
    // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // 从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。
    indexPath: 'index.html', //默认,不修改无需配置 （首页路径）
    // 部署时指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    filenameHashing: true,  //（文件名哈希）
    // 不使用缓存时配置文件名哈希
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
    // 然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
    // 如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
    pages: { //默认undefined，不使用多入口时无需配置
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        subpage: 'src/main.js'
    },
    // 在 multi-page 模式下构建应用。
    // 每个“page”应该有一个对应的 JavaScript 入口文件。
    // 其值应该是一个对象，对象的 key 是入口的名字，value 是：
    // 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)或一个指定其 entry 的字符串
    // 当在 multi-page 模式下构建时，
    // webpack 配置会包含不一样的插件 (这时会存在多个 html-webpack-plugin 和 preload-webpack-plugin 的实例)。
    // 如果你试图修改这些插件的选项，请确认运行 vue inspect
    devServer: {
        // 通过来自 webpack-dev-server 的这些选项，能够用多种方式改变其行为。
        // 支持所有 webpack-dev-server 的选项,具体配置见webpack的devServer
        // 需要注意 有些值像 host、port 和 https 可能会被命令行参数覆写。
        // 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作
        port: port,  //设置默认端口号
        open: true,  //设置dev命令结束后是否自动开启浏览器
        overlay: {  //设置编译错误或者失败时，是否浏览器全屏显示，默认false
            warnings: false,  //是否显示警告
            errors: true  //是否显示错误
        },
        proxy: {
            // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
            // 那么可以通过devServer.proxy 选项来配置，同时解决跨域问题
            // 如果你想要更多的代理控制行为，也可以使用一个 path: options 成对的对象。
            // 配置1个或多个代理服务器
            '/api': {
                target: 'https://tkzc-develop-cloud.zmaxfilm.com', //代理服务器地址
                changeOrigin: true, // 是否跨域
                // pathRewrite: { '^/api': '/api' },  //在代理过程中是否替换掉访问服务端的/api/路径,不使用无需配置
                // 例:接口实际地址为 https://tkzc-develop-cloud.zmaxfilm.com/api/接口方法  ,那么无需配置pathRewrite，
                // 接口调用时显示 http://localhost:9528/api/服务器接口方法，
                // api会将服务端的 https://tkzc-develop-cloud.zmaxfilm.com/api 进行代理
                // 如果更改了替换值，那么 本地依然显示axios配置的baseUrl，
                // 请求的服务端地址会被修改成 https://tkzc-develop-cloud.zmaxfilm.com/替换的值/接口方法，必须保证代理地址正确才能正常访问
                secure: false
            },
            '/foo': {
                target: '<other_url>'
            }
        }
        // after: require('./mock/mock-server.js')
    },

    lintOnSave: process.env.NODE_ENV !== 'production', //默认为true,还可以配置'warning',''default','error' (保存时检查eslint)
    // 配置生产环境下不使用eslint。process.env.NODE_ENV === 'development' 只在开发环境生效
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。
    // 这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
    // 设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。
    // 默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
    // 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'error'。
    // 这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
    runtimeCompiler: true,  //（运行时的编译器）
    // 是否使用包含运行时编译器的 Vue 构建版本。
    // 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    // 更多细节可查阅https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6
    transpileDependencies: ["resize-detector"], // 类型为数组或者正则方法，Array<string | RegExp>,默认值为空数组 （依赖项）
    // resize-detector 此插件用于监听元素窗口大小变化 
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
    // 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    productionSourceMap: true, // 默认true
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    // source map的目的是构建文件到生产环境时，将文件压缩混淆，减小体积，多个文件合并，减少HTTP请求数，通过编译或者转译，将其他语言编译成JavaScript
    // 这会使构建包中出现map文件，有了它，出错的时候，通过断点工具可以直接显示原始代码，而不是转换后的代码。
    // 使用会造成打包的体积变大且有暴露源码的危险，可以根据环境配置开启
    crossorigin: undefined, //类型为string 默认值undefined (交叉原点)
    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    // 需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
    /**  关于 crossorigin ：*/
    // 在HTML5中，一些 HTML 元素提供了对 CORS 的支持， 
    // 例如 <audio>、<img>、<link>、<script> 和 <video> 均有一个跨域属性 (crossOrigin property)，它允许你配置元素获取数据的 CORS 请求。
    // 配置值  :
    // anonymous 对此元素的 CORS 请求将不设置凭据标志。
    // use-credentials	对此元素的CORS请求将设置凭证标志；这意味着请求将提供凭据。
    // ""	设置一个空的值，如 crossorigin 或 crossorigin=""，和设置 anonymous 的效果一样 
    // 默认情况下（即未指定 crossOrigin 属性时），CORS 根本不会使用。
    // 如 Terminology section of the CORS specification 中的描述，
    // 在非同源情况下，设置 "anonymous" 关键字将不会通过 cookies，客户端 SSL 证书或 HTTP 认证交换用户凭据。
    // 即使是无效的关键字和空字符串也会被当作 anonymous 关键字使用。
    /***/
    /** 关于 html-webpack-plugin 插件 */
    // 本插件可以为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
    // 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
    // 插件的基本作用就是生成html文件
    // 原理是将 webpack中`entry`配置的相关入口chunk  和  `extract-text-webpack-plugin`抽取的css样式   
    // 插入到该插件提供的`template`或者`templateContent`配置项指定的内容基础上生成一个html文件，
    // 具体插入方式是将样式`link`插入到`head`元素中，`script`插入到`head`或者`body`中。
    // 不配置任何选项的html-webpack-plugin插件时，
    // 他会默认将webpack中的entry配置所有入口thunk和extract-text-webpack-plugin抽取的css样式都插入到文件指定的位置。
    /********/
    integrity: false, //默认false  integrity（完整） Subresource Integrity （子资源完整性）
    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
    // 如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
    // 需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
    // 另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次
    /** 关于Subresource Integrity (SRI) */
    // SRI 是 Subresource Integrity 的缩写，一般按照字面意义翻译为：子资源完整性（草案），
    // 它也是由 Web 应用安全工作组（Web Application Security Working Group）发布

    // Web 性能优化中很重要的一点是让请求提前结束，让可缓存的资源走 CDN 是最通用的做法。
    // CDN 服务提供商通过分布在各地的节点，让用户从最近的节点加载内容，大幅提升速度。
    // 但是 CDN 的安全性一直是一个风险点：对于网站主来说，让请求从第三方服务器经过，由第三方响应，安全方面肯定不如自己服务器可控。

    // 启用 SRI 策略后，浏览器会对资源进行 CORS 校验，这就要求被请求的资源必须同域，
    // 或者配置了 Access-Control-Allow-Origin 响应头。

    // 要使用 SRI，只需要在原有的标签里增加 integrity 属性即可，
    // 这个属性的签名算法支持 sha256、sha384 和 sha512，签名算法和摘要签名内容用 - 分隔。例如，要引入以下这个资源，并启用 SRI 策略：
    // https://example.com/static/js/other/zepto.js
    // 可以使用 sha256 算法生成摘要签名，并进行 Base64 编码：
    // url https://example.com/static/js/other/zepto.js | openssl dgst -sha256 -binary | openssl enc -base64 -A
    // 得到b/TAR5GfYbbQ3gWQCA3fxESsvgU4AbP4rZ+qu1d9CuQ=
    // 然后引入标签中
    // <script crossorigin="anonymous" integrity="sha256-b/TAR5GfYbbQ3gWQCA3fxESsvgU4AbP4rZ+qu1d9CuQ=" src="https://example.com/static/js/other/zepto.js"></script>
    // 浏览器拿到资源内容之后，会使用 integrity 所指定的签名算法计算结果，并与 integrity 提供的摘要签名比对，如果二者不一致，就不会执行这个资源。

    // 动态加载的资源使用 SRI 也是类似的，需要指定 crossOrigin（注意大小写）和 integrity 属性
    // 在加载 CSS 资源启用 SRI，使用 Fetch Api 时启用 SRI，都是类似的，这里略过。

    // 可以看到，SRI 的作用是保证页面引入第三方资源的完整性。
    // 在第三方 CDN 服务被入侵或回源被运营商劫持、文件内容被加入恶意代码时，
    // 网站如果启用了 SRI 策略，那么在支持 SRI 的浏览器下，被篡改的文件无法执行。

    // 我们知道，HTTPS 也可以确保传输过程中的数据完整性，
    // 但是对于 CDN 服务器被入侵或 HTTP 回源被劫持造成的文件篡改，HTTPS 无济于事，这时 SRI 就可以派上用场，作为补充。

    // 但是，如果网站以及 CDN 都没有使用 HTTPS，运营商可以将外链资源及 HTML 页面本身一起劫持，
    // 并将资源内容和页面中的摘要签名同步修改，让 SRI 彻底失效
    // 大部分运营商劫持，都是为了插入广告代码。如果网站启用了 SRI，会导致篡改后的整个文件无法执行，这很可能让页面变得完全不可用。
    // 所以 SRI 给我的感觉是：宁为玉碎不为瓦全。

    // 当然，为了提高可用性，也可以增加 fallback 处理。例如，在 CDN 资源被篡改而无法加载时，转为使用本站资源：
    // < script crossorigin = "anonymous" integrity = "sha256-xxxx" src = "http://cdn.example.com/js/jquery.js" ></script >
    // <script>
    // if(!window.jQuery) {
    // document.write('<scr' + 'ipt src="/js/jquery.js"></scr' + 'ipt>');
    // }
    // </script>

    // 最后，现在广泛被大家使用的「将 JS 代码缓存在本地 localStorage」方案也有很大的安全隐患。
    // 网站出现任何 XSS，都有可能被用来篡改缓存在 localStorage 的代码。
    // 之后即使 XSS 被修复，localStorage 中的代码依然是被篡改过的，持续发挥作用。要注意
    // 参考https://blog.csdn.net/zhang8907xiaoyue/article/details/78610958
    /** ************/
    configureWebpack: config => { //值为对象Object{} 或方法 Function()=>{}  configure（配置） 配置webpack
        // 配置文档地址 https://www.webpackjs.com/configuration/
        console.log('configureWebpack', config)
        config.name = name  //更改项目标题
        config.performance = {   //配置如何展示性能提示
            hints: false,//打开/关闭提示,此属性默认设置为 "warning"。
            /** false 关闭提示*/
            /** warning 将展示一条警告，通知你这是体积大的资源。在开发环境，我们推荐这样。*/
            /** error 展示一条错误，通知你这是体积大的资源。
             *  在生产环境构建时，我们推荐使用 hints: "error"，有助于防止把体积巨大的 bundle 部署到生产环境，从而影响网页的性能。 */
            maxEntrypointSize: 250000,  // 默认值是：250000 (bytes)
            /** 入口起点表示针对指定的入口，对于所有资源，要充分利用初始加载时(initial load time)期间。
             *  此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示 */
            maxAssetSize: 25000,  //默认值是：250000 (bytes)。
            /** 资源(asset)是从 webpack 生成的任何文件。此选项根据单个资源体积，控制 webpack 何时生成性能提示。*/
            assetFilter: assetFilename => {   //默认函数，类型为Function
                console.log('configureWebpack-performance-assetFilter-assetFilename', assetFilename)
                return !(/\.map$/.test(assetFilename))  //可以通过传递自己的函数来覆盖此属性,例: return assetFilename.endsWith('.js');
            }
            /** 此属性允许 webpack 控制用于计算性能提示的文件 */
        }
        config.plugins.push(   //插件配置 类型为array
            // 配置插件
            new CompressionWebpackPlugin({  //预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                // 默认值 '.'  处理所有匹配此 {RegExp} 的资源
                asset: '[path].gz[query]',
                // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
                filename: false,
                // 类型问Function 一个 {Function} (asset) => asset 函数，接收原资源名（通过 asset 选项）返回新资源名
                algorithm: 'gzip',
                threshold: 10240, //只处理比这个值大的资源。按字节计算
                minRatio: 0.8, //默认 0.8 只有压缩率比这个值小的资源才会被处理
                deleteOriginalAssets: false //是否删除原资源
            })
        )
        /** webpack中的配置形式为
         * plugins:[new webpack.optimize.CommonsChunkPlugin({ ...})]
         * 在vue-cli中推荐直接将对应插件配置push到plugins中，也可以直接使用数组
         * webpack中常用的插件配置列表 https://www.webpackjs.com/plugins/ 除此之外还可以去各大社区寻找插件或者自己编写插件
         * */
        if (process.env.NODE_ENV !== 'development') {
            // 为生产环境修改配置...
            config.externals = {  // 配置无需打包的依赖
                // 值类型有string array object function regex
                // string  形式配置
                vue: 'Vue',
                'vue-router': 'VueRouter',
                vuex: 'Vuex',
                axios: 'axios',
                AMap: 'AMap', //高德地图
                'element-ui': 'ELEMENT',
                // array  
                subtract: ['./math', 'subtract'],
                /** 转换为父子结构，其中 ./math 是父模块，而 bundle 只引用 subtract 变量下的子集。*/
                // object
                /** root：可以通过一个全局变量访问 library（例如，通过 script 标签）。
                 *  commonjs：可以将 library 作为一个 CommonJS 模块访问。
                 *  commonjs2：和上面的类似，但导出的是 module.exports.default.
                 *  amd：类似于 commonjs，但使用 AMD 模块系统。*/
                lodash: {
                    commonjs: "lodash",
                    amd: "lodash",
                    root: "_" // 指向全局变量 
                },
                subtractObj: { //subtract
                    root: ["math", "subtract"]
                },
                // function
                function(context, request, callback) {
                    if (/^yourregex$/.test(request)) {
                        return callback(null, 'commonjs ' + request);
                    }
                    callback();
                }
                // regex
                //externals: /^(jquery|\$)$/i
            }
            /** 配置选项提供了「从输出的 bundle 中排除依赖」的方法。 
             *  防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)
             *  正常情况下，部分非开发环境的依赖，我们会通过cdn或者其他途径的方式来进行引入，用来提高页面加载时的性能
             *  此配置可以删除无需在生产和正式环境中安装的依赖，让这些依赖通过cdn和其他途径进行引入*/
        } else {
            // 为开发环境修改配置...
            config.externals = {
                AMap: 'AMap'  //高德地图本地开发时也使用引入的js包，所以开发环境也删除打包
            }
        }
    },
    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的webpack配置中。
    // 如果这个值是一个函数，则会接收被解析的配置作为参数。该
    // 函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    // 具体见 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F

    // 调整 webpack 配置最简单的方式就是在 configureWebpack 选项提供一个对象或函数
    // 要注意某些配置推荐使用vue-cli中的配置而不是使用webpack的配置，例如publicPath，outputDir具体查文档

    // 此处配置具体参考webpack配置文档
    chainWebpack: config => { //类型为函数  chain(链)  链式配置
        console.log('', config)
    },
    // 配置文档地址 https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans
    // chainWebpack 会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    /** 链式操作 (高级)*/
    // Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。
    // 这个库提供了一个 webpack 原始配置的上层抽象，
    // 使其可以定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。
    // 当你打算链式访问特定的 loader 时，vue inspect 会非常有帮助。
    /** 关于 inspect（检查）*/
    // 因为 @vue/cli-service 对 webpack 配置进行了抽象，所以理解配置中包含的东西会比较困难，尤其是当你打算自行对其调整的时候。

    // vue-cli-service 暴露了 inspect 命令用于审查解析好的 webpack 配置。
    // 那个全局的 vue 可执行程序同样提供了 inspect 命令，这个命令只是简单的把 vue-cli-service inspect 代理到了你的项目中。
    // 该命令会将解析出来的 webpack 配置、包括链式访问规则和插件的提示打印到 stdout。
    // 你可以将其输出重定向到一个文件以便进行查阅：vue inspect > output.js
    // 注意它输出的并不是一个有效的 webpack 配置文件，而是一个用于审查的被序列化的格式。

    // 你也可以通过指定一个路径来审查配置的一小部分： vue inspect module.rules.0  # 只审查第一条规则
    // 或者指向一个规则或插件的名字：vue inspect --rule 规则名 或 vue inspect --plugin 插件名
    // 也可以列出所有规则和插件的名字：vue inspect --rules 或 vue inspect --plugins

    // 有些外部工具可能需要通过一个文件访问解析好的 webpack 配置，比如那些需要提供 webpack 配置路径的 IDE 或 CLI。
    // 在这种情况下你可以使用如下路径 <projectRoot>/node_modules/@vue/cli-service/webpack.config.js
    // 该文件会动态解析并输出 vue-cli-service 命令中使用的相同的 webpack 配置，包括那些来自插件甚至是你自定义的配置。
    css: {
        // modules: //从 v4 起已弃用，请使用css.requireModuleExtension。 在 v3 中，这个选项含义与 css.requireModuleExtension 相反。
        requireModuleExtension: true,
        // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
        // 设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
        // 如果你在 css.loaderOptions.css 里配置了自定义的 CSS Module 选项，
        // 则 css.requireModuleExtension 必须被显式地指定为 true 或者 false，
        // 否则无法确定是否希望将这些自定义配置应用到所有 CSS 文件中。

        /** 关于 CSS Modules */
        // CSS Modules 是一个流行的，用于模块化和组合 CSS 的系统。
        // vue-loader 提供了与 CSS Modules 的一流集成，可以作为模拟 scoped CSS 的替代方案。
        // 首先，CSS Modules 必须通过向 css-loader 传入 modules: true 来开启,具体配置见chainWebpack

        // 你可以通过 <style module> 以开箱即用的方式在 *.vue 文件中使用 CSS Modules。
        /* <style module>
        .red {
          color: red;
        }
        .bold {
          font-weight: bold;
        }
        </style> */
        // 这个 module 特性指引 Vue Loader 作为名为 $style 的计算属性，向组件注入 CSS Modules 局部对象。然后你就可以在模板中通过一个动态类绑定来使用它了：
        // <p :class="$style.red"> This should be red </p>  也支持 :class 的对象/数组语法
        // 也可以通过 JavaScript 访问到它：console.log(this.$style.red)

        // 如果想在 JavaScript 中作为 CSS Modules 导入 CSS 或其它预处理文件，该文件应该以 .module.(css|less|sass|scss|styl) 结尾：
        // import styles from './foo.module.css'
        // 所有支持的预处理器都一样工作
        // import sassStyles from './foo.module.scss'
        // 如果你想去掉文件名中的 .module，可以设置 requireModuleExtension 为 false
        extract: isProduction,  //默认值生产环境下是 true，开发环境下是 false
        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
        // 同样当构建 Web Components 组件时它总是会被禁用 (样式是 inline 的并注入到了 shadowRoot 中)。
        // 当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS。
        // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取。
        sourceMap: false, //默认false
        //是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。sourceMap文件的解释看 productionSourceMap 配置
        loaderOptions: {  //向 CSS 相关的 loader 传递选项。 默认值 {},类型 Object
            // 给 sass-loader 传递选项
            sass: {
                // 比如你可以这样向所有 Sass 样式传入共享的全局变量
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                // 注意：在 sass-loader v7 中，这个选项名是 "data"
                prependData: `@import "~@/variables.sass"`
            },
            // 给 scss-loader 传递选项
            scss: {
                prependData: `@import "~@/variables.scss";`
            },
            less: {
                // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
                // `primary` is global variables fields name
                globalVars: {
                    primary: '#fff'
                }
            },
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            }
        }
        // 具体配置见 https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9
        // 相比于使用 chainWebpack 手动指定 loader 更推荐在此处做配置，因为这些选项需要应用在使用了相应 loader 的多个地方。
        // 支持的 loader 有：
        // css-loader
        // postcss-loader
        // sass-loader
        // less-loader
        // stylus-loader
        // 另外，也可以使用 scss 选项，针对 scss 语法进行单独配置（区别于 sass 语法）。
    }









}