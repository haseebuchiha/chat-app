Rails.application.config.action_mailer.delivery_method = ENV.fetch("SMTP_DELIVERY_METHOD", "smtp").to_sym

Rails.application.config.action_mailer.smtp_settings = {
  user_name: ENV.fetch("SMTP_USERNAME", ""),
  password: ENV.fetch("SMTP_PASSWORD", ""),
  domain: ENV.fetch("HOST"),
  address: ENV.fetch("SMTP_ADDRESS"),
  port: ENV.fetch("SMTP_PORT"),
  authentication: :plain,
  enable_starttls_auto: true
}
