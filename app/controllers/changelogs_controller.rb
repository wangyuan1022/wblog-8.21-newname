class ChangelogsController < ApplicationController
  def index
    @changelogs = Changelog.order(release_date: :desc).page(params[:page])
  end

  def show
    @changelog = Changelog.find(params[:id])
  end
end