Rails.application.routes.draw do
  # Redirect root to home if user is logged in, otherwise to login page
  #root 'static_pages#loginPage'
  root 'static_pages#index'

  get '/home' => 'static_pages#home'
  get '/book/:book_id/:title' => 'static_pages#book'
  get '/profile' => 'static_pages#profile'
  get '/userPage/:username' => 'static_pages#userPage'
  get '/loginPage' => 'static_pages#loginPage'

  namespace :api do
    # USERS
    post '/users'                  => 'users#create'

    # SESSIONS
    post '/sessions'               => 'sessions#create'
    get  '/authenticated'          => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'

    # REVIEWS
    post '/reviews'                 => 'reviews#create'
    get  '/reviews'                 => 'reviews#index'
    delete '/reviews/:id'           => 'reviews#destroy'
    get  '/reviews/:username'       => 'reviews#index_by_user'
    get  '/user/reviews'            => 'reviews#index_by_current_user'
    get  '/book/:title'             => 'reviews#show'
  end

end
