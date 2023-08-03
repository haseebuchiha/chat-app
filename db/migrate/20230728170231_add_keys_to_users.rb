class AddKeysToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :keys, :text, array: true, null: false, default: []
  end
end
