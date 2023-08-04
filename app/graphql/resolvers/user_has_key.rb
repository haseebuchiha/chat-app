module Resolvers
  class UserHasKey < Base
    type Boolean, null: false
    argument :key, String, required: true

    def authorized?(**args)
      current_user.present?
    end

    def resolve(id:)
      current_user.devices.where(key: args[:key]).exists?
    end
  end
end
