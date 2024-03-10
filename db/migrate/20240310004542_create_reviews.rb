class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :overall
      t.integer :story
      t.integer :style
      t.integer :steam
      t.string :comment
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
