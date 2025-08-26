#!/bin/bash
# scripts/build.sh
echo "Building Docker images..."
docker-compose build

echo "Running database migrations..."
docker-compose run app npx prisma migrate deploy

echo "Build complete!"