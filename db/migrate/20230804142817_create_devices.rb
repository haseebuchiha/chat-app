class CreateDevices < ActiveRecord::Migration[7.0]
  def change
    create_table :devices do |t|
      t.string :name
      t.text :key
      t.references :user, null: false, foreign_key: false

      t.timestamps
    end

    add_index :devices, :key, unique: true
  end
end
