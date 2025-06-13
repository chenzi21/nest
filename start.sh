#!/bin/sh

# Check if migrations directory is empty
if [ ! -d "prisma/migrations" ] || [ -z "$(ls -A prisma/migrations)" ]; then
  echo "Creating initial migration..."
  pnpm prisma migrate dev --name init
else
  echo "Running existing migrations..."
  pnpm prisma migrate deploy
fi

pnpm start:dev 