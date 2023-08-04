#!/bin/bash
aws ecr get-login-password --region ap-southeast-1 | sudo docker login --username AWS --password-stdin 684904726815.dkr.ecr.ap-southeast-1.amazonaws.com
sed -i "s/TAG=.*/TAG=$1/g" .env
sudo docker-compose run --rm app bin/rake db:migrate
sudo docker-compose up -d
