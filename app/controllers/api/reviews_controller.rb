module Api
  class ReviewsController < ApplicationController
    def index
      @reviews = Review.all.order(created_at: :desc)
      render 'api/reviews/index'
    end

    def create
      token = cookies.signed[:lovelit_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @review = user.reviews.new(review_params)

      if @review.save!
        render 'api/reviews/create'
      end
    end

    def destroy
      token = cookies.signed[:lovelit_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false } unless session

      user = session.user
      review = Review.find_by(id: params[:id])

      if review && (review.user == user) && review.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        @reviews = user.reviews
        render 'api/reviews/index'
      end
    end

    private

    def review_params
      params.require(:review).permit(:overall, :story, :style, :steam, :comment, :book_id, :title, :author, :thumbnail)
    end
  end
end
