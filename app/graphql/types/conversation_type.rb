module Types
  class ConversationType < BaseObject
    field :id, ID, null: false
    field :message, MessageType, null: true
    field :user, UserType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def message
      object.messages.first
    end

    def user
      object.users.where.not(id: current_user.id).first
    end
  end
end
