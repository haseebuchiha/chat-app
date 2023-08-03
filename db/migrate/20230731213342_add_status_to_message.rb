class AddStatusToMessage < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :status, :integer, default: 1
  end
end
