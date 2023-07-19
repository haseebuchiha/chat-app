FROM ruby:3.1.2-alpine

RUN apk update && apk add --update --no-cache \
  # C compiler etc
  build-base \
  # Support git sources in the Gemfile
  git \
  # Used by ActiveStorage
  imagemagick \
  # Dependencies for Nokogiri
  libxml2 \
  libxslt \
  libxml2-dev \
  libxslt-dev \
  libc-dev \
  libgcrypt-dev \
  # Webpacker and friends
  nodejs \
  yarn \
  # Timezone data for Ruby's TZInfo library
  tzdata \
  # Used by the pg gem
  postgresql-dev \
  curl \
  postgresql \
  postgresql-contrib

WORKDIR /app
RUN gem install bundler:2.3.15 && bundle config build.nokogiri --use-system-libraries && bundle config force_ruby_platform true

COPY Gemfile* .ruby-version ./
RUN bundle install

COPY . .
