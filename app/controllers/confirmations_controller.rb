class ConfirmationsController < Devise::ConfirmationsController
  protected

  def after_confirmation_path_for(resource_name, resource)
    if signed_in?(resource_name)
      ENV.fetch("FRONTEND_URL", "")
    else
      "#{ENV.fetch("FRONTEND_URL", "")}/login"
    end
  end
end
