class Changelog < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
  validates :version, presence: true
end