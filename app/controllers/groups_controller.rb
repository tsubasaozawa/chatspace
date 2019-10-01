class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
    @members = @group.users
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
    @members = @group.users
  end
  # groupsコントローラのeditアクションにおいて行いたい処理は、
  # 「form_forで使用するためのインスタンス変数@groupを定義すること」のみです。
  # 今回の場合、@groupの定義も 「before_action :set_group」によって切り出されているため、
  # editアクションの定義を省略することができます。

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end
end

private

def group_params
  params.require(:group).permit(:name, { :user_ids => [] })
end

def set_group
  @group = Group.find(params[:id])
end