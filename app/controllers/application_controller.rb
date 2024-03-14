class ApplicationController < ActionController::Base

  def user_signed_in?
    cookies.signed[:lovelit_session_token].present?
  end
end
