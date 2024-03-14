class AddBookIdToReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :reviews, :book_id, :string
  end
end
