class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :user, null: false, foreign_key: false, index: true
      t.references :conversation, null: false, foreign_key: false, index: true
      t.text :body, null: false

      t.timestamps
    end
  end
end
