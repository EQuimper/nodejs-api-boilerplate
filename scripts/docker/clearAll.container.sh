#!/bin/bash
# Delete all containers
docker rm -f $(docker ps -a -q)
