module Mutations
  class SignUp < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true
    argument :password_confirmation, String, required: true
    argument :firstname, String, required: true
    argument :lastname, String, required: true
    argument :avatar_signed_id, ID, required: false

    field :message, String, null: false

    def authorized?(**args)
      true
    end

    def resolve(**args)
      args[:email] = args[:email].downcase.strip
      user = User.new(args.except(:avatar_signed_id))
      if user.save
        if args[:avatar_signed_id].present?
          user.avatar.attach(
            ActiveStorage::Blob.find_signed(args[:avatar_signed_id])
          )
        end
        {
          message: I18n.t("devise.registrations.signed_up_but_unconfirmed")
        }
      else
        raise GraphQL::ExecutionError, user.errors.full_messages.to_json
      end
    end
  end
end
