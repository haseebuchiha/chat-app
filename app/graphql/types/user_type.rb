module Types
  class UserType < BaseObject
    field :id, ID, null: false
    field :email, String, null: false
    field :avatar, String, null: true
    field :name, String, null: true
    field :initials, String, null: false

    def avatar
      Rails.application.routes.url_helpers.url_for(object.avatar) if object.avatar.attached?
    end

    def initials
      object.firstname[0] + object.lastname[0]
    end

    def name
      [object.firstname, object.lastname].compact.join(" ")
    end
  end
end
