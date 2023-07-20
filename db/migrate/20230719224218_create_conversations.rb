class CreateConversations < ActiveRecord::Migration[7.0]
  def change
    create_table :conversations do |t|
      t.references :author, null: false, foreign_key: false, class_name: 'User', index: true
      t.references :user, null: false, foreign_key: false, index: true, class_name: 'User'
      t.datetime :archived_at

      t.timestamps
    end

    add_index :conversations, [:author_id, :user_id], unique: true, where: 'archived_at IS NULL'
  end
end
