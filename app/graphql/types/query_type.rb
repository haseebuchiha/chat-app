module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    # include GraphQL::Types::Relay::HasNodeField
    # include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :conversations, resolver: Resolvers::Conversations, null: true, description: "Returns a list of all conversations for the current user"
    field :conversation_user, resolver: Resolvers::ConversationUser, null: true, description: "Returns the user for a conversation"
    field :conversation_messages, resolver: Resolvers::ConversationMessages, null: true, description: "Returns a list of all messages for a conversation"
    field :current_user, resolver: Resolvers::CurrentUser, null: true, description: "Returns the current user"
  end
end
