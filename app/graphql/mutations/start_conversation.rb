module Mutations
  class StartConversation < BaseMutation
    argument :user_id, ID, required: true

    type Types::ConversationType

    def authorized?(**args)
      current_user&.present?
    end

    def resolve(**args)
      user = User.find(args[:user_id])
      Conversation.where("user_ids @> ARRAY[?::BIGINT, ?::BIGINT]", user.id, current_user.id).first_or_create! do |conversation|
        conversation.author_id = current_user.id
        conversation.user_ids = [user.id, current_user.id]
      end
    end
  end
end
