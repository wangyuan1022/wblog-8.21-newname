/**
 * hhhh/1.js
 * 基本JavaScript函数示例文件
 */

// 基本变量声明
const userName = "用户";
let counter = 0;
var isActive = true;

/**
 * 计算两个数字的和并返回结果
 * 
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 */
function addNumbers(a, b) {
  // 参数验证
  if (typeof a !== 'number' || typeof b !== 'number') {
    console.error('参数必须是数字类型');
    return NaN;
  }
  
  return a + b;
}

/**
 * 显示欢迎信息
 * 
 * @param {string} name - 用户名称
 */
function displayWelcome(name = userName) {
  counter++;
  console.log(`欢迎, ${name}! 这是您第 ${counter} 次访问。`);
  
  if (isActive) {
    console.log('您的账户处于活跃状态。');
  } else {
    console.log('您的账户处于非活跃状态。');
  }
}

// 控制台日志输出示例
console.log('JavaScript文件已加载');

// 函数使用示例
const sum = addNumbers(5, 10);
console.log(`5 + 10 的结果是: ${sum}`);

// 调用欢迎函数
displayWelcome();
displayWelcome("张三");

// 修改状态并再次调用
isActive = false;
displayWelcome("李四");