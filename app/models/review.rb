class Review < ApplicationRecord
  belongs_to :user

  validates :user, presence: true
  validates :book_id, presence: true
  validates :overall, presence: true
  validates :story, presence: true
  validates :style, presence: true
  validates :steam, presence: true
  validates :comment, presence: true, length: { maximum: 500 }

end
