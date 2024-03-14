class StaticPagesController < ApplicationController
  def index
    if user_signed_in?
      redirect_to '/home'
    else
      redirect_to '/loginPage'
    end
  end

  def home
  end

  def user
  end

  def book
  end

  def loginPage
  end
end
