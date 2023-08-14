module Resolvers
  class Conversations < Base
    type Types::ConversationType.connection_type, null: false

    def authorized?(**args)
      true if current_user
    end

    def resolve(**args)
      RelayActiveRecordRelationConnection.new(
        current_user.conversations.order(updated_at: :desc)
      )
    end
  end
end
