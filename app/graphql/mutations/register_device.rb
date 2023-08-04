module Mutations
  class RegisterDevice < BaseMutation
    argument :key, String, required: true
    argument :name, String, required: true

    type Boolean, null: false

    def authorized?(**args)
      current_user.present?
    end

    def resolve(**args)
      current_user.devices.create!(args)
      true
    end
  end
end
