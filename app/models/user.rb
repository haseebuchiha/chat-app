class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :confirmable, :lockable, :trackable

  has_many :sent_messages, class_name: "Message", foreign_key: "sender_id"
  has_many :received_messages, class_name: "Message", foreign_key: "receiver_id"
  has_many :authored_conversations, -> { where(archived_at: nil) }, foreign_key: "author_id", class_name: 'Conversation'
  has_many :unauthored_conversations, -> { where(archived_at: nil) }, foreign_key: "user_id", class_name: 'Conversation'

  def conversations
    authored_conversations.or(unauthored_conversations)
  end
end
