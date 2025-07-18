Sidekiq.configure_server do |config|
  config.redis = { 
    host: '127.0.0.1',
    port: 6379,
    password: 'NbbKSOOV',
    db: ENV['SIDEKIQ_DB'].presence || '1' 
  }
end

Sidekiq.configure_client do |config|
  config.redis = { 
    host: '127.0.0.1',
    port: 6379,
    password: 'NbbKSOOV',
    db: ENV['SIDEKIQ_DB'].presence || '1' 
  }
end
