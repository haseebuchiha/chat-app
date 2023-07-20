class Conversation < ApplicationRecord
  belongs_to :author, class_name: "User"
  has_many :messages, dependent: :destroy
  scope :unarchived, -> { where(archived_at: nil) }

  def users
    User.where(id: user_ids)
  end
end
