module Resolvers
  class ConversationUserKeys < Base
    type [String], null: false

    argument :id, ID, required: true

    def authorized?(**args)
      current_user&.conversations&.where(id: args[:id])&.exists?
    end

    def resolve(id:)
      Device.where(user_id: Conversation.find(id).user_ids).pluck(:key)
    end
  end
end
