#!/bin/bash

echo "🔄 Restarting Next.js web service..."

# Stop the web service
docker compose -f docker-compose.dev.yml stop web

# Remove the web container to ensure clean restart
docker compose -f docker-compose.dev.yml rm -f web

# Start the web service
docker compose -f docker-compose.dev.yml up -d web

echo "✅ Next.js web service restarted!"
echo "🌐 Visit http://localhost:3000"

# Show logs
echo "📝 Following logs (Ctrl+C to exit):"
docker compose -f docker-compose.dev.yml logs -f web 