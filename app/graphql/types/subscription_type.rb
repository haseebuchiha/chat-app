class Types::SubscriptionType < GraphQL::Schema::Object
  field :message_was_sent, subscription: Subscriptions::MessageWasSent, null: true, description: "A message was sent"
end
