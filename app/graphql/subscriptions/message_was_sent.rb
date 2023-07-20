class Subscriptions::MessageWasSent < Subscriptions::BaseSubscription
  field :message, Types::MessageType, null: true
  argument :conversation_id, ID

  def update(conversation_id:)
    object || {message: nil}
  end
end
