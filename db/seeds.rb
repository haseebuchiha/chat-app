require "down"
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
  confirmed_at: Time.now,
  encrypted_password: User.new.send(:password_digest, "password")
}, {
  email: "test+2@test.com",
  firstname: "Test2",
  lastname: "Last",
  username: "test2",
  confirmed_at: Time.now,
  encrypted_password: User.new.send(:password_digest, "password")
}, {
  email: "test+3@test.com",
  firstname: "Test3",
  lastname: "Last",
  username: "test3",
  confirmed_at: Time.now,
  encrypted_password: User.new.send(:password_digest, "password")
}], unique_by: :email, record_timestamps: true)
Conversation.insert_all([{user_ids: [User.first.id, User.second.id]}, {user_ids: [User.first.id, User.third.id]}], record_timestamps: true)
Message.insert_all([{
  user_id: User.first.id,
  conversation_id: Conversation.first.id,
  body: "Hi"
}, {
  user_id: User.second.id,
  conversation_id: Conversation.first.id,
  body: "Hello"
}, {
  user_id: User.third.id,
  conversation_id: Conversation.second.id,
  body: "Hi"
}, {
  user_id: User.first.id,
  conversation_id: Conversation.second.id,
  body: "Yola!!!"
}], record_timestamps: true)
User.all.each.with_index do |u, i|
  image = Down.download("https://i.pravatar.cc/150?img=#{i}")
  u.avatar.attach(io: image, filename: image.original_filename, content_type: image.content_type)
end
