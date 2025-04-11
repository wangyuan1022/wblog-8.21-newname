/**
 * hhhh/4.js
 * DOM操作和事件处理函数示例文件
 */

// 基本变量声明
const domSelectors = {
  container: '#app-container',
  mainContent: '.main-content',
  navbar: '.navbar',
  buttons: '.btn',
  form: '#contact-form',
  menuItems: '.menu-item'
};

let eventTypes = ['click', 'submit', 'change', 'mouseover', 'mouseout'];
var uiConfig = {
  animations: true,
  darkMode: false,
  responsive: true,
  validationEnabled: true
};

/**
 * DOM元素创建和操作函数
 * 
 * @param {string} tagName - 要创建的HTML元素标签名
 * @param {Object} attributes - 元素属性对象
 * @param {string|HTMLElement|Array} children - 子元素或内容
 * @returns {HTMLElement} 创建的DOM元素
 */
function createElement(tagName, attributes = {}, children = null) {
  // 参数验证
  if (!tagName || typeof tagName !== 'string') {
    console.error('标签名必须是有效的字符串');
    return null;
  }
  
  // 创建元素
  const element = document.createElement(tagName);
  
  // 设置属性
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'classList' && Array.isArray(value)) {
      value.forEach(cls => element.classList.add(cls));
    } else if (key === 'style' && typeof value === 'object') {
      Object.entries(value).forEach(([prop, val]) => {
        element.style[prop] = val;
      });
    } else if (key === 'dataset' && typeof value === 'object') {
      Object.entries(value).forEach(([dataKey, dataVal]) => {
        element.dataset[dataKey] = dataVal;
      });
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(key, value);
    }
  });
  
  // 添加子元素或内容
  if (children) {
    if (typeof children === 'string') {
      element.textContent = children;
    } else if (children instanceof HTMLElement) {
      element.appendChild(children);
    } else if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
          element.appendChild(child);
        }
      });
    }
  }
  
  return element;
}

/**
 * 事件处理函数：为指定元素添加多个事件监听器
 * 
 * @param {string|HTMLElement} selector - DOM选择器或DOM元素
 * @param {Object} handlers - 事件处理对象，键为事件类型，值为处理函数
 * @param {Object} options - 事件选项
 * @returns {Object} 包含移除事件监听器方法的对象
 */
function setupEventHandlers(selector, handlers = {}, options = {}) {
  // 获取目标元素
  const elements = typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : [selector instanceof HTMLElement ? selector : null].filter(Boolean);
    
  if (elements.length === 0) {
    console.error(`未找到匹配选择器的元素: ${selector}`);
    return { removeAll: () => {} };
  }
  
  const defaultOptions = {
    preventDefault: false,
    stopPropagation: false,
    useCapture: false,
    once: false,
    passive: true
  };
  
  // 合并选项
  const settings = {...defaultOptions, ...options};
  
  // 存储添加的事件监听器
  const addedListeners = [];
  
  // 为每个元素添加事件处理器
  elements.forEach(element => {
    Object.entries(handlers).forEach(([eventType, handler]) => {
      if (typeof handler !== 'function') return;
      
      // 创建事件包装器，应用选项
      const eventWrapper = function(event) {
        if (settings.preventDefault) event.preventDefault();
        if (settings.stopPropagation) event.stopPropagation();
        
        // 调用原始处理函数
        handler.call(this, event, element);
      };
      
      // 添加事件监听器
      element.addEventListener(eventType, eventWrapper, {
        capture: settings.useCapture,
        once: settings.once,
        passive: settings.passive
      });
      
      // 记录添加的监听器
      addedListeners.push({
        element,
        eventType,
        handler: eventWrapper
      });
    });
  });
  
  // 返回移除监听器的方法
  return {
    removeAll() {
      addedListeners.forEach(({element, eventType, handler}) => {
        element.removeEventListener(eventType, handler);
      });
      addedListeners.length = 0;
    },
    count: addedListeners.length
  };
}

// 控制台日志输出
console.log('DOM操作和事件处理模块已加载');

// 函数使用示例 - 创建DOM元素
// 注意: 这些示例在浏览器环境中可以正常工作，在Node.js环境中会报错
try {
  // 创建一个按钮元素
  const button = createElement('button', {
    id: 'submit-btn',
    classList: ['btn', 'btn-primary'],
    style: {
      padding: '10px 15px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none'
    },
    onclick: function() {
      console.log('按钮被点击了!');
    }
  }, '提交表单');
  
  console.log('创建的按钮元素:', button);
  
  // 创建一个带有子元素的容器
  const container = createElement('div', {
    classList: ['container'],
    dataset: {
      testId: 'main-container'
    }
  }, [
    createElement('h2', {}, '表单标题'),
    createElement('p', {}, '请填写以下信息'),
    button
  ]);
  
  console.log('创建的容器元素:', container);
  
  // 假设页面上已经有DOM元素的场景
  if (typeof document !== 'undefined') {
    // 为文档中的按钮添加事件处理器
    const eventManager = setupEventHandlers(domSelectors.buttons, {
      click: (event, element) => {
        console.log(`按钮 ${element.textContent} 被点击`);
      },
      mouseover: (event) => {
        event.target.style.opacity = '0.8';
      },
      mouseout: (event) => {
        event.target.style.opacity = '1';
      }
    }, {
      preventDefault: true
    });
    
    console.log(`已添加 ${eventManager.count} 个事件监听器`);
  }
} catch (error) {
  console.error('DOM操作示例在非浏览器环境中无法运行:', error.message);
}