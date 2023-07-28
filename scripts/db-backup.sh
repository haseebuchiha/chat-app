#!/bin/bash

file=$(date "+%Y-%m-%d").dump
sudo docker exec -i $COMPOSE_PROJECT_NAME-db-1 /bin/sh -c "pg_dump -Fc --verbose --clean --no-acl --no-owner -d postgres://postgres:$POSTGRES_PASSWORD@db" > $file
aws --region $AWS_REGION s3 cp $file s3://$DB_BACKUP_BUCKET/$file
rm $file
