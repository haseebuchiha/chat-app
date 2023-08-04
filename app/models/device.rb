class Device < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :key, presence: true
  validates :key, uniqueness: true
end
