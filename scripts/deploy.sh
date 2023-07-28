#!/bin/bash

sed -i "s/TAG=.*/TAG=$1/g" .env
sudo docker-compose run --rm app bin/rake db:migrate
sudo docker-compose up -d
