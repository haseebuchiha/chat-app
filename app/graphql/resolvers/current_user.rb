module Resolvers
  class CurrentUser < Base
    type Types::UserType, null: true

    def authorized?(**args)
      true
    end

    def resolve(**args)
      current_user
    end
  end
end
