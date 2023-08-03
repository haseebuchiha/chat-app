module Types
  class MessageStatusEnum < Types::BaseEnum
    value "sent", "Message was sent"
    value "delivered", "Message was delivered"
    value "read", "Message was read"
  end
end
