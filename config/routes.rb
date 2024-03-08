Rails.application.routes.draw do
  root to: "static_pages#home"
  get 'home' => 'static_pages#home'
  get 'book' => 'static_pages#book'
  get 'profile' => 'static_pages#profile'
  get 'loginPage' => 'static_pages#loginPage'
end
