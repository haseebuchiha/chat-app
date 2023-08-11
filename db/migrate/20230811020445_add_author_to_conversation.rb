class AddAuthorToConversation < ActiveRecord::Migration[7.0]
  def change
    add_reference :conversations, :author, null: false, foreign_key: false, class_name: "User"
  end
end
