#!/usr/bin/sh

docker rm mongo-server
docker run -d -p 27017:27017 --name mongo-server mongo
