module Mutations
  class Login < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: false

    field :user, Types::UserType, null: true

    def authorized?(**args)
      true
    end

    def resolve(**args)
      email = args[:email].downcase.strip
      authenticator = CustomDatabaseAuthenticatable.new(
        email: email,
        password: args[:password]
      )
      authenticator.authenticate!
      if authenticator.message
        errors = {
          error: I18n.t("devise.failure.#{authenticator.message}")
        }
        user = User.find_by(email: email)
        if user
          if authenticator.message == :locked
            errors[:locked_at] = user.last_failed_attempt_at
          else
            errors[:remaining_attempts] = Devise.maximum_attempts - user.failed_attempts
          end
        end
        raise GraphQL::ExecutionError, errors.to_json
      end
      context[:sign_in].call(authenticator.user)
      {
        user: authenticator.user
      }
    end
  end
end
