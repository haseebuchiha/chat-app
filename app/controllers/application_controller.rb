class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from StandardError, with: :render_500

  def record_not_found(e)
    render json: { error: e.message }, status: :not_found
  end
  def record_invalid(e)
    render json: { error: e.message }, status: :unprocessable_entity
  end
  def render_500(e)
      logger.error e.message
      logger.error e.backtrace.join("\n")
    render json: { error: e.message }, status: :internal_server_error
  end
end
