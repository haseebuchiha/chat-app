module Resolvers
  class ConversationUser < Base
    type Types::UserType, null: false

    argument :id, ID, required: true

    def authorized?(**args)
      current_user&.conversations&.where(id: args[:id])&.exists?
    end

    def resolve(id:)
      Conversation.find(id).users.where.not(id: current_user.id).first
    end
  end
end
