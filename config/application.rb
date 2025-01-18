require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module LoveLitReviews
  class Application < Rails::Application
    # Initialize configuration defaults for Rails 7
    config.load_defaults 7.0
    # Configure the logger to output to STDOUT
    config.logger = ActiveSupport::Logger.new($stdout)

    # Configure default headers to prevent caching
    config.action_dispatch.default_headers = {
      'Cache-Control' => 'no-store'
    }

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
