#!/bin/bash

set -e

echo "Starting portfolio deployment..."

echo "Pulling latest changes..."
git pull origin main

echo "Building and restarting containers..."
docker compose up -d --build

echo "Cleaning unused Docker resources..."
docker image prune -f

echo "Deployment completed successfully!"
