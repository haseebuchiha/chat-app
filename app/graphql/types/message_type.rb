module Types
  class MessageType < BaseObject
    field :id, ID, null: false
    field :body, String, null: false
    field :user, UserType, null: false
    field :is_author, Boolean, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    def is_author
      object.user_id == current_user.id
    end
  end
end
