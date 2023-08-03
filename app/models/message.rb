class Message < ApplicationRecord
  belongs_to :user
  belongs_to :conversation
  validates :body, presence: true
  enum status: [:sent, :delivered, :read]
end
