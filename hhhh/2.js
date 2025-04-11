/**
 * hhhh/2.js
 * 数组和字符串处理函数示例文件
 */

// 基本变量声明
const fruits = ["苹果", "香蕉", "橙子", "葡萄"];
let textSample = "Hello World! 你好，世界！";
var dataCount = 42;

/**
 * 处理数组的函数：过滤并转换数组元素
 * 
 * @param {Array} array - 要处理的数组
 * @param {function} filterFn - 过滤函数
 * @param {function} mapFn - 转换函数
 * @returns {Array} 处理后的新数组
 */
function processArray(array, filterFn, mapFn) {
  // 参数验证
  if (!Array.isArray(array)) {
    console.error('第一个参数必须是数组');
    return [];
  }
  
  // 应用过滤和转换
  return array
    .filter(item => filterFn ? filterFn(item) : true)
    .map(item => mapFn ? mapFn(item) : item);
}

/**
 * 处理字符串的函数：统计字符，转换格式等
 * 
 * @param {string} text - 需要处理的文本
 * @param {Object} options - 处理选项
 * @returns {Object} 处理结果
 */
function processString(text, options = {}) {
  // 默认选项
  const defaultOptions = {
    countChars: true,
    toUpperCase: false,
    trim: false
  };
  
  // 合并选项
  const settings = {...defaultOptions, ...options};
  
  // 处理结果
  const result = {
    original: text,
    processed: text
  };
  
  // 应用处理选项
  if (settings.trim) {
    result.processed = result.processed.trim();
  }
  
  if (settings.toUpperCase) {
    result.processed = result.processed.toUpperCase();
  }
  
  if (settings.countChars) {
    result.charCount = text.length;
    result.nonSpaceCount = text.replace(/\s/g, '').length;
  }
  
  return result;
}

// 控制台日志输出
console.log('数组和字符串处理模块已加载');

// 函数使用示例 - 处理数组
const longFruits = processArray(
  fruits,
  fruit => fruit.length > 2,  // 过滤条件：长度大于2
  fruit => fruit.toUpperCase()  // 转换为大写
);
console.log('处理后的水果数组:', longFruits);

// 函数使用示例 - 处理字符串
const processedText = processString(textSample, {
  trim: true,
  toUpperCase: true
});
console.log('处理后的文本结果:', processedText);

// 组合使用示例
const fruitText = fruits.join(', ');
const combinedResult = processString(fruitText);
console.log('水果列表文本分析:', combinedResult);