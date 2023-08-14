module Types
  class MutationType < Types::BaseObject
    field :send_message, mutation: Mutations::SendMessage, null: true, description: "Sends a new message to a conversation"
    field :login, mutation: Mutations::Login, null: true, description: "Logs in a user"
    field :register_device, mutation: Mutations::RegisterDevice, null: false, description: "Registers a new device for a user"
    field :logout, mutation: Mutations::Logout, null: false, description: "Logs out a user"
    field :start_conversation, mutation: Mutations::StartConversation, null: false, description: "Starts a new conversation"
    field :sign_up, mutation: Mutations::SignUp, null: false, description: "Signs up a new user"
  end
end
