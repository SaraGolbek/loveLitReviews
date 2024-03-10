Rails.application.routes.draw do
  root to: "static_pages#loginPage"
  get 'home' => 'static_pages#home'
  get 'book/:id' => 'static_pages#book'
  get 'profile/:username' => 'static_pages#profile'
  get 'loginPage' => 'static_pages#loginPage'

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
    get  '/users/:username/reviews' => 'reviews#index_by_user'
  end

end
