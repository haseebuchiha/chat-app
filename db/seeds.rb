# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.insert_all([{
  email: "test+1@test.com",
  firstname: "Test1",
  lastname: "Last",
  username: "test1",
  encrypted_password: User.new.send(:password_digest, "password")
}, {
  email: "test+2@test.com",
  firstname: "Test2",
  lastname: "Last",
  username: "test2",
  encrypted_password: User.new.send(:password_digest, "password")
}], unique_by: :email, record_timestamps: true)
Conversation.insert_all([{
  author_id: User.first.id,
  user_id: User.second.id
}, {
  author_id: User.second.id,
  user_id: User.first.id
}], unique_by: [:author_id, :user_id], record_timestamps: true)
Message.insert_all([{
  user_id: User.first.id,
  conversation_id: Conversation.first.id,
  body: "Hello"
}, {
  user_id: User.second.id,
  conversation_id: Conversation.second.id,
  body: "Hi"
}], record_timestamps: true)
