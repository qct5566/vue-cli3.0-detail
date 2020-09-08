/* eslint-disable */
// babel转码器配置，用于把es6代码转为低版本代码，用于兼容不支持es6的环境
// Babel 编译两大核心 语法转换和垫片支持

// vuecil3.0+中使用此文件进行配置，旧版本在.babelrc进行配置

// 默认情况下，babel-loader 会排除 node_modules 依赖内部的文件。
// 如果希望显性编译一个依赖的模块，需要将其添加入transpileDependencies选项
module.exports = {
  presets: [ //设置转码规则
    '@vue/cli-plugin-babel/preset' //vue脚手架集成了cli-plugin-babel插件，使用其中的preset规则文件即可,支持jsx语法
    // "es2015", 将安装的规则放入这里，脚手架已jic集成相关
    // "react",
    // "stage-2"
  ],
  plugins: [ //设置插件
    // 插件的排列顺序很重要。
    // 插件在 Presets 前运行。
    // 插件顺序从前往后排列。
    // Preset 顺序是颠倒的（从后往前）
    'add-module-exports',
    //插件说明：在 babel 5 时代，export default {}; 除了会被转译成 exports.default = {};，还会加一句 module.exports = exports.default
    //bael6之后支持es6规范，使用import调用export时，即使module.exports不需要定义，也会去拿对应的exports.default，其实没必要使用
    [
      '@babel/plugin-transform-modules-commonjs',
      // 支持 commonjs 模块化语法 import => require()
      {
        allowTopLevelThis: true
      }
    ],
  ]
  // transpileDependencies: [
  // 可以是字符串或正则表达式
  // 'my-dep',
  // /other-dep/
  // ]

}

// presets字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。
// # ES2015转码规则
// $ npm install --save-dev babel-preset-es2015

// # react转码规则
// $ npm install --save-dev babel-preset-react

// # ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
// $ npm install --save-dev babel-preset-stage-0
// $ npm install --save-dev babel-preset-stage-1
// $ npm install --save-dev babel-preset-stage-2
// $ npm install --save-dev babel-preset-stage-3