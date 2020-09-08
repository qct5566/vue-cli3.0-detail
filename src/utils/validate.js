/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
// 是否为正整数
export function isPositiveInteger(s) {
  var re = /^[0-9]+$/;
  return re.test(s);
}
// 是否为正数
export function isPositive(num) {
  var reg = /^\d+(?=\.{0,1}\d+$|$)/;
  if (reg.test(num)) return true;
  return false;
}
// 是否为正整数
export function isInteger(s) {
  var re = /^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/;
  return re.test(s);
}
export function mobileValid(s) {
  var reg = /^((13[0-9])|(145)|(15[0-3])|(15[5-9])|(170)|(173)|(17[5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
  return reg.test(s);
}
// 字符串型数字，2位小数
export const STRING_NUMBER = (rule, value, callback) => {
  const reg = new RegExp('^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$');
  if (!value) {
    // callback(new Error('请输入正确的金额!'))
    callback();
  } else if (reg.test(value) === false) {
    callback(new Error('请输入最多包含2位小数的正数!'));
  } else {
    callback();
  }
};
export const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

export const positiveInteger = {
  pattern: /^[0-9]+$/,
  message: '只能是大于等于0的整数',
  trigger: 'blur'
};
export const noZeroInteger = {
  pattern: /^\+?[1-9]\d*$/,
  message: '只能是大于0的整数',
  trigger: 'blur'
};

// 不限制小数点后位数
export const positiveNumber = {
  pattern: /^([0-9]+(\.\d+)?|0\.\d+)$/,
  message: '只能是大于等于0的小数',
  trigger: 'blur'
};

export const floatPositiveNumber = {
  pattern: /^[0-9]+(.[0-9]{1,2})?$/,
  message: '只能是小数点后保留2位的正小数',
  trigger: 'blur'
};

export const password = {
  pattern: /^[^\u4e00-\u9fa5]{6,20}$/,
  message: '密码必须为6-20位非中文字符',
  trigger: 'blur'
};

export const noChinese = {
  pattern: /^[^\u4e00-\u9fa5]+$/,
  message: '必须为非中文字符',
  trigger: 'blur'
};

export const hotLine = {
  pattern: /^[\d-,]*$/,
  message: '只能输入数字和英文符号 “-” “,”',
  trigger: 'blur'
};
export const phone = [
  { min: 11, max: 11, message: '手机号码必须是11位', trigger: 'blur' },
  { pattern: /^1\d{10}/, message: '请填写正确手机号', trigger: 'blur' }
];

// 身份证号
export const idCardNo = [
  {
    pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
    message: '请填写正确的身份证号',
    trigger: 'blur'
  }
];

export const rangetimeValid = (start, end, errmsg) => {
  return (rule, value, callback) => {
    console.log(rule, value);
    if (!start && !end) {
      callback(new Error(errmsg || '请选择时间'));
    }
    callback();
  };
};
