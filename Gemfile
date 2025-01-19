source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.2' # Match Render's default Ruby version

gem 'rails', '~> 7.0' # Minimum version to ensure compatibility
gem 'puma', '~> 6.0'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'jbuilder', '~> 2.7'
gem 'bcrypt', '~> 3.1.7'
gem 'font-awesome-sass', '~> 6.5.1'
gem 'dotenv-rails' # Include in all environments
gem 'rake', '~> 13.0' # Explicitly add rake
gem 'activesupport', '>= 7.0.8.7'

gem 'bootsnap', '>= 1.18.0', require: false

group :development, :test do
  gem 'rspec-rails'
  gem 'sqlite3', '~> 1.5'
  gem 'byebug'
end

group :development do
  gem 'web-console', '>= 4.1.0'
  gem 'rack-mini-profiler', '~> 2.3'
  gem 'listen', '~> 3.3'
  gem 'spring'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver', '>= 4.0.0.rc1'
  gem 'webdrivers'
end

group :production do
  gem 'pg', '>= 1.4'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
