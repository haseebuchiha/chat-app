class CreateConversations < ActiveRecord::Migration[7.0]
  def change
    create_table :conversations do |t|
      t.bigint :user_ids, array: true, null: false, default: []
      t.datetime :archived_at, null: true
      t.timestamps
    end

    add_index :conversations, :user_ids, using: "gin", where: "archived_at IS NULL"
  end
end
