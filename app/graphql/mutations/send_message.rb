module Mutations
  class SendMessage < BaseMutation
    argument :conversation_id, ID, required: true
    argument :body, String, required: true

    type Types::MessageType

    def authorized?(**args)
      @conversation = Conversation.find(args[:conversation_id])
      true if current_user && @conversation.user_ids.include?(current_user.id)
    end

    def resolve(**args)
      @message = @conversation.messages.create!(
        body: args[:body],
        user: current_user,
        status: :sent
      )
      @conversation.touch
      ChatAppSchema.subscriptions.trigger(
        # Field name
        :message_was_sent,
        # Arguments
        {conversation_id: @conversation.id},
        # Object
        {message: @message},
        # This corresponds to `context[:current_organization_id]`
        # in the original subscription:
        scope: @conversation.user_ids.reject { |id| id == current_user.id }.first
      )
      @message
    end
  end
end
