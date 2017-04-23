#!/bin/bash
# Delete all images
docker rmi -f $(docker images -q)
