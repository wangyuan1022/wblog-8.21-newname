/**
 * hhhh/3.js
 * 数学计算和日期时间处理函数示例文件
 */

// 基本变量声明
const numbers = [12, 45, 67, 32, 89];
let currentDate = new Date();
var config = {
  precision: 2,
  useMetric: true,
  timeFormat: '24h'
};

// 复杂对象示例
const userData = {
  id: 1001,
  name: "测试用户",
  preferences: {
    theme: "dark",
    notifications: true
  },
  activities: [
    { date: "2023-10-15", type: "登录" },
    { date: "2023-10-16", type: "更新资料" }
  ]
};

/**
 * 数学计算相关函数：统计分析数字数组
 * 
 * @param {Array<number>} data - 数字数组
 * @param {Object} options - 计算选项
 * @returns {Object} 统计结果对象
 */
function calculateStatistics(data, options = {}) {
  // 参数验证
  if (!Array.isArray(data) || data.length === 0) {
    console.error('数据必须是非空数组');
    return null;
  }
  
  // 确保所有元素都是数字
  const validData = data.filter(item => typeof item === 'number' && !isNaN(item));
  if (validData.length === 0) {
    console.error('数组中没有有效的数字');
    return null;
  }
  
  // 计算基本统计值
  const sum = validData.reduce((acc, val) => acc + val, 0);
  const count = validData.length;
  const mean = sum / count;
  
  // 排序数组用于计算中位数
  const sortedData = [...validData].sort((a, b) => a - b);
  const median = count % 2 === 0 
    ? (sortedData[count/2 - 1] + sortedData[count/2]) / 2 
    : sortedData[Math.floor(count/2)];
    
  // 计算标准差
  const variance = validData.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
  const stdDev = Math.sqrt(variance);
  
  // 返回结果对象
  return {
    count,
    sum,
    mean,
    median,
    min: sortedData[0],
    max: sortedData[sortedData.length - 1],
    stdDev,
    // 根据精度设置格式化结果
    formattedMean: mean.toFixed(options.precision || config.precision)
  };
}

/**
 * 日期时间处理函数：格式化和计算日期差异
 * 
 * @param {Date|string} date - 要处理的日期对象或日期字符串
 * @param {Object} options - 格式化选项
 * @returns {Object} 日期处理结果
 */
function processDate(date, options = {}) {
  // 将输入转换为日期对象
  let dateObj;
  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = new Date(); // 默认使用当前日期
  }
  
  // 验证日期对象是否有效
  if (isNaN(dateObj.getTime())) {
    console.error('提供的日期无效');
    return null;
  }
  
  // 默认选项
  const settings = {
    format: options.format || 'YYYY-MM-DD',
    locale: options.locale || 'zh-CN',
    calculateAge: options.calculateAge || false,
    timeFormat: options.timeFormat || config.timeFormat
  };
  
  // 格式化日期
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  
  // 根据格式选项生成格式化字符串
  let formatted = settings.format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
    
  // 计算与当前日期的差异
  const now = new Date();
  const diffTime = Math.abs(now - dateObj);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // 如果需要计算年龄
  let age = null;
  if (settings.calculateAge && dateObj < now) {
    age = now.getFullYear() - year;
    // 如果生日还没到，年龄减一
    if (
      now.getMonth() < dateObj.getMonth() || 
      (now.getMonth() === dateObj.getMonth() && now.getDate() < dateObj.getDate())
    ) {
      age--;
    }
  }
  
  // 返回结果
  return {
    date: dateObj,
    formatted,
    timestamp: dateObj.getTime(),
    diffFromNow: {
      milliseconds: diffTime,
      seconds: Math.floor(diffTime / 1000),
      minutes: Math.floor(diffTime / (1000 * 60)),
      hours: Math.floor(diffTime / (1000 * 60 * 60)),
      days: diffDays
    },
    age
  };
}

// 控制台日志输出
console.log('数学计算和日期时间处理模块已加载');

// 函数使用示例 - 计算统计数据
const stats = calculateStatistics(numbers, { precision: 3 });
console.log('数字数组统计结果:', stats);

// 函数使用示例 - 处理日期
const dateResult1 = processDate('2000-05-15', { 
  format: 'YYYY年MM月DD日',
  calculateAge: true 
});
console.log('出生日期分析:', dateResult1);

// 使用当前日期的示例
const dateResult2 = processDate(currentDate, { 
  format: 'YYYY-MM-DD HH:mm:ss' 
});
console.log('当前日期信息:', dateResult2);

// 组合示例 - 处理用户活动日期
if (userData.activities && userData.activities.length > 0) {
  const activityDates = userData.activities.map(activity => {
    const processed = processDate(activity.date);
    return {
      type: activity.type,
      date: processed.formatted,
      daysAgo: processed.diffFromNow.days
    };
  });
  console.log('用户活动历史:', activityDates);
}