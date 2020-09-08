module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential"],
  globals: {
    BMap: true,
    BMAP_ANIMATION_BOUNCE: true,
    AMap:true,
  },
  rules: {
    'no-mixed-spaces-and-tabs': [0, 'never'], // 禁止空格和tab混合缩进
    'no-tabs': 'off', // 禁止tab
    'accessor-pairs': 2, // 强制 getter 和 setter 在对象中成对出现
    'arrow-spacing': [
      // 强制箭头函数的箭头前后使用一致的空格
      2,
      {
        before: true,
        after: true
      }
    ],
    'block-spacing': [2, 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格
    'brace-style': [
      // 强制在代码块中使用一致的大括号风格
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    camelcase: [
      // 强制使用骆驼拼写法命名约定
      0,
      {
        properties: 'always'
      }
    ],
    'comma-dangle': [2, 'never'], // 要求或禁止末尾逗号
    'comma-spacing': [
      // 强制在逗号前后使用一致的空格
      2,
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [2, 'last'], // 强制使用一致的逗号风格
    'constructor-super': 2, // 要求在构造函数中有 super() 的调用
    curly: [2, 'multi-line'], // 强制所有控制语句使用一致的括号风格
    'dot-location': [2, 'property'], // 强制在点号之前和之后一致的换行
    'eol-last': 2, // 要求或禁止文件末尾存在空行
    eqeqeq: [2, 'allow-null'], // 要求使用 === 和 !==
    'generator-star-spacing': [
      // 强制 generator 函数中 * 号周围使用一致的空格
      2,
      {
        before: true,
        after: true
      }
    ],
    'handle-callback-err': [2, '^(err|error)$'], // 要求回调函数中有容错处理
    indent: 0, // 强制使用一致的缩进
    // indent: [ 2, 2, { SwitchCase: 1 }],
    'jsx-quotes': ['error', 'prefer-single'], // 强制在 JSX 属性中一致地使用双引号或单引号
    'key-spacing': [
      // 强制在对象字面量的属性中键和值之间使用一致的间距
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'keyword-spacing': [
      // 强制在关键字前后使用一致的空格
      2,
      {
        before: true,
        after: true
      }
    ],
    'new-cap': [
      // 要求构造函数首字母大写
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    'new-parens': 2, // 强制或禁止调用无参构造函数时有圆括号
    'no-array-constructor': 2, // 禁用 Array 构造函数
    'no-caller': 2, // 禁用 arguments.caller 或 arguments.callee
    'no-console': 'off', // 禁用 console
    'no-class-assign': 2, // 禁止修改类声明的变量
    'no-cond-assign': 2, // 禁止条件表达式中出现赋值操作符
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'no-control-regex': 2, // 禁止在正则表达式中使用控制字符
    'no-delete-var': 2, // 禁止删除变量
    'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称
    'no-dupe-keys': 2, // 禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2, // 禁止出现重复的 case 标签
    'no-empty-character-class': 2, // 禁止在正则表达式中使用空字符集
    'no-empty-pattern': 2, // 禁止使用空解构模式
    'no-eval': 2, // 禁用 eval()
    'no-ex-assign': 2, // 禁止对 catch 子句的参数重新赋值
    'no-extend-native': 2, // 禁止扩展原生类型
    'no-extra-bind': 2, // 禁止不必要的 .bind() 调用
    'no-extra-boolean-cast': 2, // 禁止不必要的布尔转换
    'no-extra-parens': [2, 'functions'], // 禁止不必要的括号
    'no-fallthrough': 2, // 禁止 case 语句落空
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow': 0,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 'error',
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 0,
    'no-with': 2,
    'one-var': [
      2,
      {
        initialized: 'never'
      }
    ],
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    'padded-blocks': [2, 'never'],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: 0,
    // "semi-spacing": [
    //   2,
    //   {
    //     before: false,
    //     after: true
    //   }
    // ],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': 0,
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false
      }
    ],
    'import/no-duplicates': 0,
    'array-bracket-spacing': [2, 'never'],
    'vue/html-self-closing': 0,
    'vue/order-in-components': 0,
    'vue/max-attributes-per-line': 0,
    'vue/attributes-order': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-v-html': 0,
    'vue/require-default-prop': 0,
    'vue/require-valid-default-prop': 0,
    'vue/mustache-interpolation-spacing': 0, //{{ 文字前后空格 }}
    'vue/html-indent': 0,
    'vue/no-template-shadow': 0,
    'vue/require-prop-types': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/require-prop-type-constructor': 0,
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'fetch',
          'asyncData',
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          'head',
          ['template', 'render'],
          'renderError'
        ]
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
