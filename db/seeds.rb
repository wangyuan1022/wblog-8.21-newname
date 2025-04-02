puts 'Creating admin user...'
Administrator.create_with(password: 'admin')
  .find_or_create_by!(name: 'admin')

puts 'Creating example changelogs...'

# 清除已有的示例数据（可选，确保不重复创建）
Changelog.destroy_all if Rails.env.development?

# 按时间倒序添加变更记录，较新版本在前
changelogs_data = [
  {
    title: "引入全新界面设计",
    version: "2.5.0",
    content: "- 重新设计了博客首页和文章详情页\n- 优化了移动端显示效果\n- 新增深色模式支持\n- 改进了代码块的语法高亮显示\n- 修复了一些已知的界面Bug",
    release_date: Date.today - 14.days
  },
  {
    title: "评论系统升级",
    version: "2.4.0",
    content: "- 新增评论回复通知功能\n- 支持Markdown格式评论\n- 优化了评论审核流程\n- 增强了反垃圾评论功能\n- 修复了评论计数不准确的问题",
    release_date: Date.today - 45.days
  },
  {
    title: "标签系统改进",
    version: "2.3.0",
    content: "- 新增标签云展示\n- 优化了标签搜索功能\n- 增加了标签关联推荐\n- 支持按标签订阅内容\n- 完善了标签管理后台",
    release_date: Date.today - 90.days
  },
  {
    title: "性能优化",
    version: "2.2.0",
    content: "- 提升了页面加载速度\n- 优化了数据库查询效率\n- 实现了局部内容缓存\n- 减少了不必要的HTTP请求\n- 压缩了静态资源文件",
    release_date: Date.today - 180.days
  },
  {
    title: "初始版本发布",
    version: "1.0.0",
    content: "- 博客基本功能上线\n- 支持文章发布和编辑\n- 基础评论功能\n- 简单的用户系统\n- 响应式设计",
    release_date: Date.today - 365.days
  }
]

changelogs_data.each do |changelog_data|
  Changelog.find_or_create_by!(version: changelog_data[:version]) do |changelog|
    changelog.title = changelog_data[:title]
    changelog.content = changelog_data[:content]
    changelog.release_date = changelog_data[:release_date]
    puts "Created changelog: #{changelog.version}"
  end
end