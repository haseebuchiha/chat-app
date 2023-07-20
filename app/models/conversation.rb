class Conversation < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :user
  has_many :messages, dependent: :destroy
end
