class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :confirmable, :lockable, :trackable

  has_many :messages, dependent: :destroy
  has_one_attached :avatar

  def conversations
    Conversation.unarchived.where("user_ids @> ARRAY[?::BIGINT]", id)
  end

  def add_key(key)
    keys << key
    save!
  end
end
