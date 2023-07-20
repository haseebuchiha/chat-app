require "devise/strategies/authenticatable"

class CustomDatabaseAuthenticatable < Devise::Strategies::Authenticatable
  attr_accessor :params

  def initialize(params)
    @params = params
    super({"devise.allow_params_authentication" => true}, :user)
  end

  def authenticate!
    valid?
    resource = password.present? && mapping.to.find_for_database_authentication(authentication_hash)
    hashed = false

    if validate(resource) {
         hashed = true
         resource.valid_password?(password)
       }
      if resource.confirmed?
        resource.after_database_authentication
        success!(resource)
      else
        fail!(:unconfirmed)
      end
    end

    # In paranoid mode, hash the password even when a resource doesn't exist for the given authentication key.
    # This is necessary to prevent enumeration attacks - e.g. the request is faster when a resource doesn't
    # exist in the database if the password hashing algorithm is not called.
    mapping.to.new.password = password if !hashed && Devise.paranoid
    unless resource
      Devise.paranoid ? fail(:invalid) : fail(:not_found_in_database)
    end
  end

  def params_auth_hash
    params
  end
end
