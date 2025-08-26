#!/bin/bash
# scripts/start.sh
echo "Starting containers..."
docker-compose up -d

echo "Application is starting..."
echo "PostgreSQL: localhost:5432"
echo "Next.js App: http://localhost:3000"