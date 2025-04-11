/**
 * hhhh/6.js
 * 数据可视化和图表生成功能示例文件
 */

// 基本变量声明
const chartConfig = {
  width: 800,               // 图表默认宽度
  height: 400,              // 图表默认高度
  margin: {                 // 图表边距
    top: 30,
    right: 20,
    bottom: 50,
    left: 60
  },
  animation: true,          // 是否启用动画
  responsive: true,         // 是否响应式
  displayLegend: true       // 是否显示图例
};

let chartInstances = [];    // 存储已创建的图表实例
var sampleData = {          // 示例数据集
  monthlyRevenue: [
    { month: '一月', value: 1200 },
    { month: '二月', value: 1900 },
    { month: '三月', value: 1500 },
    { month: '四月', value: 2100 },
    { month: '五月', value: 2400 },
    { month: '六月', value: 1800 },
    { month: '七月', value: 2200 },
    { month: '八月', value: 2500 },
    { month: '九月', value: 2300 },
    { month: '十月', value: 2700 },
    { month: '十一月', value: 2900 },
    { month: '十二月', value: 3100 }
  ],
  productSales: [
    { name: '产品A', sales: 450 },
    { name: '产品B', sales: 320 },
    { name: '产品C', sales: 280 },
    { name: '产品D', sales: 190 },
    { name: '产品E', sales: 140 }
  ],
  yearlyComparison: [
    { year: '2020', category: '电子', value: 500 },
    { year: '2020', category: '服装', value: 350 },
    { year: '2020', category: '食品', value: 200 },
    { year: '2021', category: '电子', value: 600 },
    { year: '2021', category: '服装', value: 400 },
    { year: '2021', category: '食品', value: 280 },
    { year: '2022', category: '电子', value: 720 },
    { year: '2022', category: '服装', value: 380 },
    { year: '2022', category: '食品', value: 310 }
  ]
};

/**
 * 颜色主题配置对象
 * 为不同类型的图表和数据类别提供颜色方案
 */
const colorThemes = {
  // 默认主题
  default: {
    primary: ['#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F', '#EDC948', '#B07AA1', '#FF9DA7'],
    background: '#FFFFFF',
    text: '#333333',
    grid: '#CCCCCC'
  },
  // 暗色主题
  dark: {
    primary: ['#6BAED6', '#FD8D3C', '#F16667', '#74C476', '#9467BD', '#FFDB6D', '#C49C94', '#8C6D31'],
    background: '#2D2D2D',
    text: '#E0E0E0',
    grid: '#555555'
  },
  // 柔和主题
  pastel: {
    primary: ['#8DD3C7', '#FFFFB3', '#BEBADA', '#FB8072', '#80B1D3', '#FDB462', '#B3DE69', '#FCCDE5'],
    background: '#F7F7F7',
    text: '#666666',
    grid: '#DDDDDD'
  },
  // 高对比度主题
  contrast: {
    primary: ['#0072B2', '#E69F00', '#CC79A7', '#009E73', '#D55E00', '#F0E442', '#56B4E9', '#000000'],
    background: '#FFFFFF',
    text: '#000000',
    grid: '#AAAAAA'
  }
};

/**
 * 绘制柱状图的函数
 * 
 * @param {string|HTMLElement} container - 图表容器ID或DOM元素
 * @param {Array<Object>} data - 图表数据
 * @param {Object} options - 图表选项
 * @returns {Object} 图表实例对象
 */
function createBarChart(container, data, options = {}) {
  // 参数验证
  if (!container || !data || !Array.isArray(data) || data.length === 0) {
    console.error('绘制柱状图需要有效的容器和数据');
    return null;
  }
  
  // 合并选项
  const settings = {
    ...chartConfig,
    ...options,
    type: 'bar',
    xKey: options.xKey || Object.keys(data[0]).find(key => typeof data[0][key] === 'string'),
    yKey: options.yKey || Object.keys(data[0]).find(key => typeof data[0][key] === 'number'),
    colorTheme: options.colorTheme || 'default'
  };
  
  // 选择主题
  const theme = colorThemes[settings.colorTheme] || colorThemes.default;
  
  // 创建图表实例
  const chartInstance = {
    id: `chart_${Date.now()}`,
    container: container,
    data: [...data],
    settings: settings,
    theme: theme,
    
    // 渲染函数
    render() {
      // 在实际应用中，这里会使用D3.js、Chart.js等库来绘制图表
      // 这里仅模拟渲染过程
      
      console.log(`渲染柱状图，包含 ${this.data.length} 个数据点`);
      console.log(`- X轴: ${this.settings.xKey}`);
      console.log(`- Y轴: ${this.settings.yKey}`);
      
      const containerElement = typeof this.container === 'string'
        ? document.getElementById(this.container)
        : this.container;
      
      if (containerElement && typeof document !== 'undefined') {
        // 在浏览器环境下的渲染（简化模拟）
        containerElement.innerHTML = `
          <div class="chart-container" style="position: relative; width: ${this.settings.width}px; height: ${this.settings.height}px;">
            <h3 style="color: ${this.theme.text};">${this.settings.title || '柱状图'}</h3>
            <div class="chart-canvas">柱状图已渲染，包含 ${this.data.length} 个数据条</div>
            <div class="chart-legend">图例已渲染</div>
          </div>
        `;
      }
      
      // 返回实例以支持链式调用
      return this;
    },
    
    // 更新数据
    updateData(newData) {
      this.data = [...newData];
      return this.render();
    },
    
    // 导出图表为图片（在实际应用中会实现）
    exportImage(format = 'png') {
      console.log(`导出图表为 ${format} 格式图片`);
      return `data:image/${format};base64,模拟的图表图片数据...`;
    }
  };
  
  // 保存实例引用
  chartInstances.push(chartInstance);
  
  // 渲染并返回实例
  return chartInstance.render();
}

/**
 * 绘制折线图的函数
 * 
 * @param {string|HTMLElement} container - 图表容器ID或DOM元素
 * @param {Array<Object>} data - 图表数据
 * @param {Object} options - 图表选项
 * @returns {Object} 图表实例对象
 */
function createLineChart(container, data, options = {}) {
  // 参数验证
  if (!container || !data || !Array.isArray(data) || data.length === 0) {
    console.error('绘制折线图需要有效的容器和数据');
    return null;
  }
  
  // 合并选项
  const settings = {
    ...chartConfig,
    ...options,
    type: 'line',
    xKey: options.xKey || Object.keys(data[0]).find(key => typeof data[0][key] === 'string'),
    yKey: options.yKey || Object.keys(data[0]).find(key => typeof data[0][key] === 'number'),
    colorTheme: options.colorTheme || 'default',
    smooth: options.smooth !== undefined ? options.smooth : true,
    showPoints: options.showPoints !== undefined ? options.showPoints : true,
    areaFill: options.areaFill !== undefined ? options.areaFill : false
  };
  
  // 选择主题
  const theme = colorThemes[settings.colorTheme] || colorThemes.default;
  
  // 创建图表实例
  const chartInstance = {
    id: `chart_${Date.now()}`,
    container: container,
    data: [...data],
    settings: settings,
    theme: theme,
    
    // 渲染函数
    render() {
      // 在实际应用中，这里会使用D3.js、Chart.js等库来绘制图表
      // 这里仅模拟渲染过程
      
      console.log(`渲染折线图，包含 ${this.data.length} 个数据点`);
      console.log(`- X轴: ${this.settings.xKey}`);
      console.log(`- Y轴: ${this.settings.yKey}`);
      console.log(`- 平滑曲线: ${this.settings.smooth ? '是' : '否'}`);
      console.log(`- 显示数据点: ${this.settings.showPoints ? '是' : '否'}`);
      
      const containerElement = typeof this.container === 'string'
        ? document.getElementById(this.container)
        : this.container;
      
      if (containerElement && typeof document !== 'undefined') {
        // 在浏览器环境下的渲染（简化模拟）
        containerElement.innerHTML = `
          <div class="chart-container" style="position: relative; width: ${this.settings.width}px; height: ${this.settings.height}px;">
            <h3 style="color: ${this.theme.text};">${this.settings.title || '折线图'}</h3>
            <div class="chart-canvas">折线图已渲染，包含 ${this.data.length} 个数据点</div>
            <div class="chart-legend">图例已渲染</div>
          </div>
        `;
      }
      
      // 返回实例以支持链式调用
      return this;
    },
    
    // 添加数据点
    addDataPoint(point) {
      this.data.push(point);
      return this.render();
    },
    
    // 导出数据为CSV
    exportCSV() {
      const headers = Object.keys(this.data[0]).join(',');
      const rows = this.data.map(item => {
        return Object.values(item).join(',');
      });
      
      return [headers, ...rows].join('\n');
    }
  };
  
  // 保存实例引用
  chartInstances.push(chartInstance);
  
  // 渲染并返回实例
  return chartInstance.render();
}

/**
 * 生成图表标题和标签的辅助函数
 * 
 * @param {Object} options - 选项配置
 * @returns {Object} 包含各种标题和标签的对象
 */
function generateChartLabels(options = {}) {
  // 默认选项
  const settings = {
    titleText: options.titleText || '数据可视化图表',
    xAxisLabel: options.xAxisLabel || '',
    yAxisLabel: options.yAxisLabel || '',
    subtitle: options.subtitle || '',
    footnote: options.footnote || '',
    valuePrefix: options.valuePrefix || '',
    valueSuffix: options.valueSuffix || '',
    valueFormat: options.valueFormat || 'decimal', // 'decimal', 'percent', 'currency'
    precision: options.precision !== undefined ? options.precision : 1,
    locale: options.locale || 'zh-CN'
  };
  
  // 根据格式选项创建格式化函数
  let formatter;
  switch (settings.valueFormat) {
    case 'percent':
      formatter = (value) => `${(value * 100).toFixed(settings.precision)}%`;
      break;
    case 'currency':
      formatter = (value) => new Intl.NumberFormat(settings.locale, {
        style: 'currency',
        currency: options.currency || 'CNY',
        minimumFractionDigits: settings.precision,
        maximumFractionDigits: settings.precision
      }).format(value);
      break;
    default: // 'decimal'
      formatter = (value) => {
        const formatted = new Intl.NumberFormat(settings.locale, {
          minimumFractionDigits: settings.precision,
          maximumFractionDigits: settings.precision
        }).format(value);
        return `${settings.valuePrefix}${formatted}${settings.valueSuffix}`;
      };
  }
  
  // 创建标题元素
  const createTitle = (container, text) => {
    if (!container || !text || typeof document === 'undefined') return null;
    
    const titleElement = document.createElement('h2');
    titleElement.className = 'chart-title';
    titleElement.textContent = text;
    container.appendChild(titleElement);
    return titleElement;
  };
  
  // 创建轴标签
  const createAxisLabel = (container, text, isXAxis = true) => {
    if (!container || !text || typeof document === 'undefined') return null;
    
    const labelElement = document.createElement('div');
    labelElement.className = isXAxis ? 'x-axis-label' : 'y-axis-label';
    labelElement.textContent = text;
    
    if (isXAxis) {
      labelElement.style.textAlign = 'center';
      labelElement.style.marginTop = '10px';
    } else {
      labelElement.style.transform = 'rotate(-90deg)';
      labelElement.style.position = 'absolute';
      labelElement.style.left = '-40px';
      labelElement.style.top = '50%';
    }
    
    container.appendChild(labelElement);
    return labelElement;
  };
  
  return {
    settings,
    formatter,
    createTitle,
    createAxisLabel,
    
    // 格式化单个值
    formatValue(value) {
      return formatter(value);
    },
    
    // 格式化数据系列
    formatSeries(data, valueKey) {
      return data.map(item => ({
        ...item,
        formattedValue: formatter(item[valueKey])
      }));
    },
    
    // 创建完整标题组（在实际应用中实现）
    applyLabelsToChart(chartContainer, chartInstance) {
      console.log(`正在为图表应用标签: ${settings.titleText}`);
      // 这里会在实际应用中实现DOM操作
      return {
        titleElement: { text: settings.titleText },
        xAxisLabel: { text: settings.xAxisLabel },
        yAxisLabel: { text: settings.yAxisLabel }
      };
    }
  };
}

// 控制台日志输出
console.log('数据可视化和图表生成模块已加载');

// 函数使用示例 - 柱状图
try {
  // 在浏览器环境中，这会创建真实图表
  // 在Node.js环境中，仅模拟过程
  const productBarChart = createBarChart('product-chart', sampleData.productSales, {
    title: '产品销售统计',
    xKey: 'name',
    yKey: 'sales',
    colorTheme: 'default',
    width: 600,
    height: 300
  });
  
  console.log('柱状图创建结果:', productBarChart ? '成功' : '失败');
  
  // 创建标签工具
  const barChartLabels = generateChartLabels({
    titleText: '2023年度产品销售统计',
    xAxisLabel: '产品名称',
    yAxisLabel: '销售量(件)',
    valueFormat: 'decimal',
    valueSuffix: ' 件'
  });
  
  // 格式化数据示例
  const formattedSales = barChartLabels.formatSeries(sampleData.productSales, 'sales');
  console.log('格式化后的产品销售数据:', formattedSales);
  
} catch (error) {
  console.error('柱状图示例执行错误:', error.message);
}

// 函数使用示例 - 折线图
try {
  // 创建月度收入趋势折线图
  const revenueLineChart = createLineChart('revenue-chart', sampleData.monthlyRevenue, {
    title: '月度收入趋势',
    xKey: 'month',
    yKey: 'value',
    colorTheme: 'pastel',
    smooth: true,
    showPoints: true,
    width: 700,
    height: 350
  });
  
  console.log('折线图创建结果:', revenueLineChart ? '成功' : '失败');
  
  // 创建标签工具
  const lineChartLabels = generateChartLabels({
    titleText: '2023年度月收入趋势',
    xAxisLabel: '月份',
    yAxisLabel: '收入(元)',
    valueFormat: 'currency',
    currency: 'CNY'
  });
  
  // 生成CSV数据导出示例
  if (revenueLineChart) {
    const csvData = revenueLineChart.exportCSV();
    console.log('生成的CSV数据预览:\n', csvData.split('\n').slice(0, 3).join('\n') + '\n...');
  }
  
} catch (error) {
  console.error('折线图示例执行错误:', error.message);
}

// 创建多系列图表示例（年度比较）
console.log('----多系列数据图表示例----');
const yearlyData = sampleData.yearlyComparison;

// 按年份分组
const years = [...new Set(yearlyData.map(item => item.year))];
const categories = [...new Set(yearlyData.map(item => item.category))];

console.log(`数据包含 ${years.length} 个年度, ${categories.length} 个分类`);

years.forEach(year => {
  const yearData = yearlyData.filter(item => item.year === year);
  console.log(`${year}年数据:`, yearData.map(item => `${item.category}: ${item.value}`).join(', '));
});

// 在实际应用中，这里会创建复杂的多系列柱状图或折线图
console.log('为多系列数据创建可视化图表...');