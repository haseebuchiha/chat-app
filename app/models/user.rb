class User < ApplicationRecord
  include PgSearch::Model
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :confirmable, :lockable, :trackable

  has_many :messages, dependent: :destroy
  has_one_attached :avatar
  has_many :devices, dependent: :destroy
  has_many :authored_conversations, class_name: "Conversation", foreign_key: "author_id", dependent: :destroy

  pg_search_scope :search, against: {
                             firstname: "A",
                             lastname: "A",
                             email: "A"
                           },
    using: {
      tsearch: {prefix: true}
    }

  def conversations
    Conversation.unarchived.where("user_ids @> ARRAY[?::BIGINT]", id)
  end
end
