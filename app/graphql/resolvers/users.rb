module Resolvers
  class Users < Base
    type Types::UserType.connection_type, null: false

    argument :query, String, required: false

    def authorized?(**args)
      current_user&.present?
    end

    def resolve(**args)
      users = User.where.not(id: current_user.id).where(id: Device.select(:user_id))
      users = users.search(args[:query]) if args[:query].present?
      RelayActiveRecordRelationConnection.new(
        users.order(firstname: :asc)
      )
    end
  end
end
