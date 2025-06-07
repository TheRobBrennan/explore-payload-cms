# Docker Enhancements

This document outlines the Docker enhancements implemented in the Payload CMS project.

## Overview

The Docker configuration has been optimized with the following improvements:

1. **Multi-stage builds** for all services to reduce image size and improve build efficiency
2. **Health checks** for all containers to ensure proper startup sequencing
3. **Non-root user execution** for improved security
4. **Timezone configuration** for consistent logging and scheduling
5. **Optimized layer caching** for faster rebuilds

## Docker Compose Configuration

The `docker-compose.yml` file has been enhanced with:

- Proper service dependencies with health checks
- Volume mapping for data persistence
- Environment variable configuration with sensible defaults
- Container restart policies
- Network configuration for service communication

## Container Health Checks

Each Payload CMS application now includes:

- A dedicated `/api/health` endpoint for container health monitoring
- Docker health check configuration in the compose file
- Proper dependency sequencing to ensure the database is ready before starting the application

## Usage

The following npm scripts are available for managing the Docker environment:

```bash
# Start all containers with logs
npm start

# Start all containers in detached mode
npm run start:detached

# Rebuild and start fresh containers
npm run start:clean

# Stop all containers
npm run stop
```

## Multi-stage Build Process

The Dockerfiles now use a multi-stage build process:

1. **Base stage**: Sets up the Node.js environment with necessary dependencies
2. **Dependencies stage**: Installs and caches npm dependencies
3. **Source stage**: Prepares the application code
4. **Runner stage**: Creates the final image with only what's needed to run the application

This approach significantly reduces the final image size and improves build performance.

## Security Enhancements

Security has been improved by:

- Running containers as a non-root user
- Using specific versions for base images
- Removing unnecessary files and tools from the final image
- Setting proper file permissions

## Environment Variables

The following environment variables can be configured:

- `PAYLOAD_SECRET`: Secret key for Payload CMS
- `DATABASE_URI`: PostgreSQL connection string
- `MONGODB_URI`: MongoDB connection string
- `NEXT_PUBLIC_SERVER_URL`: Public URL for the application
- `PREVIEW_SECRET`: Secret key for preview functionality
- `POSTGRES_USER`: PostgreSQL username
- `POSTGRES_PASSWORD`: PostgreSQL password
- `POSTGRES_DB`: PostgreSQL database name
