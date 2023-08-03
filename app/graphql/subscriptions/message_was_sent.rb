class Subscriptions::MessageWasSent < Subscriptions::BaseSubscription
  field :message, Types::MessageType, null: true
  argument :conversation_id, ID
  subscription_scope :current_user_id

  def subscribe(conversation_id:)
    {message: nil}
  end

  def update(conversation_id:)
    object || {message: nil}
  end
end
