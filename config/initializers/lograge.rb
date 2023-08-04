Rails.application.configure do
  config.lograge.enabled = ENV.fetch("LOGRAGE_ENABLED", "false") == "true"
  config.lograge.ignore_actions = ["HomeController#health_check", "GraphqlController#execute"]
end
