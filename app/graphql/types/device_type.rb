module Types
  class DeviceType < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :key, String, null: true
  end
end
