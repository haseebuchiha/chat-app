# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags "ActionCable", current_user&.id
    end

    protected

    def find_verified_user # this checks whether a user is authenticated with devise
      request.env["warden"].user
    rescue UncaughtThrowError
      nil
    end
  end
end
