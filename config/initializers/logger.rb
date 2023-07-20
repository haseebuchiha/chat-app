if ENV["RAILS_LOG_TO_STDOUT"].present?
  logger = ActiveSupport::Logger.new($stdout)
  logger.formatter = Rails.application.config.log_formatter
  Rails.application.config.logger = ActiveSupport::TaggedLogging.new(logger)
end
