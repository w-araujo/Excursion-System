#!/bin/bash

# Execute Prisma migrations
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate

# Start the application
npm run start