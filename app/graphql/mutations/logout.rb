module Mutations
  class Logout < BaseMutation
    type Boolean, null: false
    argument :key, String, required: true

    def authorized?(key:)
      current_user.present?
    end

    def resolve(key:)
      current_user.devices.where(key: key).destroy_all
      context[:sign_out].call(current_user)
    end
  end
end
