module Mutations
  class Logout < BaseMutation
    type Boolean, null: false

    def authorized?
      current_user.present?
    end

    def resolve
      context[:sign_out].call(current_user)
    end
  end
end
