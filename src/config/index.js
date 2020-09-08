// import devConfig from '../../config/dev.env.js'
// import prodConfig from '../../config/prod.env.js'
const env = process.env.NODE_ENV;
const devHost = 'http://tkzc-develop-sysapi.zmaxfilm.com/';
const testHost = 'https://tkzc-release-mapi.zmaxfilm.com/';
const prodHost = 'https://tkzc-pre-mapi.zmaxfilm.com/';
const noProdUrl = location.protocol === 'https:' ? 'wss' : 'ws' + '://47.105.116.91:9501'
const baseUrl = '/api';
// 开发环境： npm run dev
const development = {
  webSocketUrl: noProdUrl,
  host: devHost,
  baseUrl
};

// 打包开发环境： npm run build dev
const dev = {
  webSocketUrl: noProdUrl,
  host: devHost,
  baseUrl
};

// 打包测试环境： npm run build test
const test = {
  webSocketUrl: noProdUrl,
  host: testHost,
  baseUrl
};

// 打包正式环境： npm run build
const production = {
  webSocketUrl: 'ws://120.27.69.182:9501',
  host: prodHost,
  baseUrl
};

const CONFIG = {
  development,
  dev,
  test,
  production
};
const address = 'http://localhost:9530';

export const iframeUrl = {
  memberDetail: address + '/member/index.html#/memberDetail/'
};

export default CONFIG[env];
