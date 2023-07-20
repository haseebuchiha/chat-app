module Types
  class MutationType < Types::BaseObject
    field :send_message, mutation: Mutations::SendMessage, null: true, description: "Sends a new message to a conversation"
    field :login, mutation: Mutations::Login, null: true, description: "Logs in a user"
  end
end
