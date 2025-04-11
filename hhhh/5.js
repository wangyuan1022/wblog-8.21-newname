/**
 * hhhh/5.js
 * 异步编程功能示例文件
 */

// 基本变量声明
const asyncConfig = {
  timeout: 3000,            // 默认超时时间（毫秒）
  retryCount: 3,            // 默认重试次数
  retryDelay: 1000,         // 重试间隔时间（毫秒）
  cacheEnabled: true,       // 是否启用缓存
  logErrors: true           // 是否记录错误
};

let requestQueue = [];
var apiEndpoints = {
  users: 'https://api.example.com/users',
  posts: 'https://api.example.com/posts',
  comments: 'https://api.example.com/comments'
};

/**
 * Promise相关的工具函数：创建可控超时和重试的Promise
 * 
 * @param {Function} promiseFn - 返回Promise的函数
 * @param {Object} options - 超时和重试选项
 * @returns {Promise} 增强后的Promise
 */
function enhancedPromise(promiseFn, options = {}) {
  // 合并选项
  const settings = {
    timeout: options.timeout || asyncConfig.timeout,
    retry: options.retry || asyncConfig.retryCount,
    retryDelay: options.retryDelay || asyncConfig.retryDelay,
    onRetry: options.onRetry || ((attempt, error) => {
      console.log(`重试 (${attempt}/${settings.retry}): ${error.message}`);
    })
  };
  
  // 重试逻辑
  const executeWithRetry = (attempt = 0) => {
    return new Promise((resolve, reject) => {
      // 创建超时定时器
      const timeoutId = settings.timeout > 0 ? 
        setTimeout(() => {
          reject(new Error(`操作超时 (${settings.timeout}ms)`));
        }, settings.timeout) : null;
      
      // 执行Promise函数
      promiseFn()
        .then(result => {
          if (timeoutId) clearTimeout(timeoutId);
          resolve(result);
        })
        .catch(error => {
          if (timeoutId) clearTimeout(timeoutId);
          
          // 判断是否需要重试
          if (attempt < settings.retry) {
            settings.onRetry(attempt + 1, error);
            
            // 延迟后重试
            setTimeout(() => {
              executeWithRetry(attempt + 1)
                .then(resolve)
                .catch(reject);
            }, settings.retryDelay);
          } else {
            reject(error);
          }
        });
    });
  };
  
  // 跟踪请求
  const trackRequest = () => {
    const request = {
      id: Date.now(),
      timestamp: new Date(),
      status: 'pending'
    };
    
    requestQueue.push(request);
    
    return {
      start() {
        request.status = 'started';
        return executeWithRetry();
      },
      cancel() {
        request.status = 'cancelled';
        throw new Error('请求已取消');
      },
      requestInfo: request
    };
  };
  
  return trackRequest();
}

/**
 * 使用async/await的函数：模拟数据获取和处理
 * 
 * @param {string} endpoint - API端点或资源路径
 * @param {Object} params - 请求参数
 * @returns {Promise<Object>} 处理后的数据
 */
async function fetchAndProcessData(endpoint, params = {}) {
  try {
    // 验证输入
    if (!endpoint) {
      throw new Error('必须提供有效的端点');
    }
    
    // 构建请求URL
    const url = apiEndpoints[endpoint] || endpoint;
    
    // 添加查询参数（在实际应用中会更复杂）
    const queryParams = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;
    
    console.log(`开始请求数据: ${fullUrl}`);
    
    // 模拟数据获取（在实际应用中会使用fetch或axios）
    const data = await simulateHttpRequest(fullUrl);
    
    // 数据处理和转换
    const processedData = {
      source: endpoint,
      timestamp: new Date(),
      params,
      data: data,
      count: Array.isArray(data) ? data.length : 1,
      // 其他处理逻辑...
    };
    
    console.log(`成功获取并处理数据，共 ${processedData.count} 条记录`);
    return processedData;
    
  } catch (error) {
    // 错误处理
    if (asyncConfig.logErrors) {
      console.error(`获取数据失败: ${error.message}`);
    }
    
    // 根据错误类型决定是否抛出或返回默认值
    if (error.message.includes('超时') || error.message.includes('取消')) {
      throw error; // 超时和取消错误重新抛出
    }
    
    // 返回默认结果
    return {
      source: endpoint,
      timestamp: new Date(),
      error: error.message,
      data: [],
      count: 0
    };
  }
}

/**
 * 使用setTimeout模拟异步HTTP请求
 * 
 * @param {string} url - 请求URL
 * @param {Object} options - 请求选项
 * @returns {Promise<Object>} 响应数据
 */
function simulateHttpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const delay = options.delay || Math.random() * 1000 + 500; // 随机延迟500ms-1500ms
    
    // 模拟随机失败（约20%概率）
    const shouldFail = options.forceSuccess === true ? false : Math.random() < 0.2;
    
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('网络请求失败'));
        return;
      }
      
      // 根据URL生成不同的模拟数据
      let responseData;
      
      if (url.includes('users')) {
        responseData = [
          { id: 1, name: '张三', email: 'zhang@example.com' },
          { id: 2, name: '李四', email: 'li@example.com' },
          { id: 3, name: '王五', email: 'wang@example.com' }
        ];
      } else if (url.includes('posts')) {
        responseData = [
          { id: 101, title: '异步JavaScript指南', author: 1 },
          { id: 102, title: 'Promise使用技巧', author: 2 },
          { id: 103, title: 'Async/Await最佳实践', author: 1 }
        ];
      } else if (url.includes('comments')) {
        responseData = [
          { id: 201, postId: 101, text: '非常有用的文章', author: 3 },
          { id: 202, postId: 101, text: '感谢分享!', author: 2 },
          { id: 203, postId: 102, text: '这解决了我的问题', author: 1 }
        ];
      } else {
        responseData = { message: '未知资源', url };
      }
      
      resolve(responseData);
    }, delay);
  });
}

// 控制台日志输出
console.log('异步编程模块已加载');

// 函数使用示例 - 增强Promise
const userRequest = enhancedPromise(
  () => simulateHttpRequest(apiEndpoints.users),
  { timeout: 2000, retry: 2 }
);

userRequest.start()
  .then(users => {
    console.log('获取到的用户列表:', users);
  })
  .catch(error => {
    console.error('无法获取用户:', error.message);
  });

// 函数使用示例 - Async/Await
(async function() {
  try {
    // 连续获取相关数据
    const postsData = await fetchAndProcessData('posts');
    
    if (postsData.count > 0) {
      const firstPostId = postsData.data[0].id;
      
      // 使用第一篇文章的ID获取评论
      console.log(`获取文章 #${firstPostId} 的评论`);
      
      const commentsData = await fetchAndProcessData('comments');
      
      // 过滤出与第一篇文章相关的评论
      const relevantComments = commentsData.data.filter(
        comment => comment.postId === firstPostId
      );
      
      console.log(`文章 #${firstPostId} 有 ${relevantComments.length} 条评论`);
    }
  } catch (error) {
    console.error('数据处理过程中出错:', error);
  }
})();

// 并行请求示例
Promise.all([
  fetchAndProcessData('users'),
  fetchAndProcessData('posts')
])
  .then(([users, posts]) => {
    console.log(`同时获取到 ${users.count} 个用户和 ${posts.count} 篇文章`);
    
    // 合并作者信息到文章
    const enrichedPosts = posts.data.map(post => {
      const author = users.data.find(user => user.id === post.author);
      return {
        ...post,
        authorName: author ? author.name : '未知作者',
        authorEmail: author ? author.email : ''
      };
    });
    
    console.log('带作者信息的文章:', enrichedPosts);
  })
  .catch(error => {
    console.error('并行数据获取失败:', error);
  });