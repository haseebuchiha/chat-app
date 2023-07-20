Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  devise_for :users
  get "/health_check", to: "health_check#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
