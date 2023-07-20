module Types
  class ChatType < BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :message, String, null: false

    def message
      object.messages.last.body
    end
  end
end
