class CreateChangelogs < ActiveRecord::Migration[7.1]
  def change
    create_table :changelogs do |t|
      t.string :title
      t.text :content
      t.string :version
      t.date :release_date

      t.timestamps
    end
  end
end
