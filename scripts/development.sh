#!/usr/bin/env bash
# For Development

# --build: Build images before starting containers.
# --abort-on-container-exit: Stops all containers if any container is stopped
docker-compose up --build --abort-on-container-exit
