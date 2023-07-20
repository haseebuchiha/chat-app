host_uri = URI.parse(ENV.fetch("HOST"))
Rails.application.routes.default_url_options[:host] = "#{host_uri.scheme}://#{host_uri.host}"
Rails.application.routes.default_url_options[:port] = host_uri.port
