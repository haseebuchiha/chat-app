FROM node:18-alpine

RUN apk update && apk add --update --no-cache \
  curl

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn

COPY . .
