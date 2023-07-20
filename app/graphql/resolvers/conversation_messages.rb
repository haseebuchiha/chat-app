module Resolvers
  class ConversationMessages < Base
    type Types::MessageType.connection_type, null: false

    argument :conversation_id, ID, required: true

    def authorized?(**args)
      current_user&.conversations&.where(id: args[:conversation_id])&.exists?
    end

    def resolve(**args)
      RelayActiveRecordRelationConnection.new(
        current_user.conversations.find_by(id: args[:conversation_id]).messages.order(created_at: :desc)
      )
    end
  end
end
