module Resolvers
  class Conversations < Base
    type [Types::ChatType], null: false

    def authorized?(**args)
      return true if current_user
    end

    def resolve(**args)
      current_user.conversations.order(created_at: :desc)
    end
  end
end
