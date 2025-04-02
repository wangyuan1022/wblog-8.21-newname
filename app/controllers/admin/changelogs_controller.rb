class Admin::ChangelogsController < Admin::BaseController
  before_action :set_changelog, only: [:edit, :update, :destroy]

  def index
    @changelogs = Changelog.order(release_date: :desc).page(params[:page]).per(25)
  end

  def new
    @changelog = Changelog.new
  end

  def edit
  end

  def create
    @changelog = Changelog.new(changelog_params)

    if @changelog.save
      flash[:notice] = '创建变更记录成功'
      redirect_to admin_changelogs_path
    else
      flash.now[:error] = '创建失败'
      render :new, status: 422
    end
  end

  def update
    if @changelog.update(changelog_params)
      flash[:notice] = '更新变更记录成功'
      redirect_to admin_changelogs_path
    else
      flash[:error] = '更新变更记录失败'
      render :edit
    end
  end

  def destroy
    if @changelog.destroy
      flash[:notice] = '删除变更记录成功'
    else
      flash[:error] = '删除变更记录失败'
    end
    redirect_to admin_changelogs_path
  end

  private

  def set_changelog
    @changelog = Changelog.find(params[:id])
  end

  def changelog_params
    params.require(:changelog).permit(:title, :content, :version, :release_date)
  end
end