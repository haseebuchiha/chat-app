CACHE_STORE = ENV.fetch("CACHE_STORE", "redis")
if CACHE_STORE == "redis"
  Rails.application.config.cache_store = :redis_cache_store, {driver: :hiredis, url: ENV["REDIS_URL"] + (ENV["TEST_ENV_NUMBER"] ? "/#{ENV["TEST_ENV_NUMBER"]}" : "")}
elsif CACHE_STORE == "memcached"
  Rails.application.config.cache_store = :mem_cache_store, ENV.fetch("MEMCACHIER_SERVERS", "").split(","),
    {username: ENV["MEMCACHIER_USERNAME"],
     password: ENV["MEMCACHIER_PASSWORD"],
     failover: true,
     socket_timeout: 1.5,
     socket_failure_delay: 0.2,
     down_retry_delay: 60}
end
