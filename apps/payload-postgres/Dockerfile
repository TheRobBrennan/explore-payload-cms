# Optimized multi-stage build for Payload CMS with PostgreSQL

# Use a smaller Node.js base image
FROM node:20-alpine AS base
# Combine RUN commands to reduce layers
RUN apk add --no-cache python3 make g++ libc6-compat && \
    corepack enable pnpm

# Dependencies stage - focused on efficient caching
FROM base AS deps
WORKDIR /app

# Copy only package files for better layer caching
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (production + dev for build)
RUN pnpm install --frozen-lockfile

# Source files stage - prepare application code
FROM base AS source
WORKDIR /app

# Accept DATABASE_URI as a build argument
ARG DATABASE_URI
ENV DATABASE_URI=${DATABASE_URI}

# Copy all source code and configuration files
COPY . .

# Production stage - minimal image with only what's needed to run
FROM base AS runner
WORKDIR /app

# Set runtime environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_SECRET=payload-cms-secret-key

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs --ingroup nodejs && \
    apk add --no-cache \
    curl \
    openssl \
    tzdata && \
    cp /usr/share/zoneinfo/America/Los_Angeles /etc/localtime && \
    echo "America/Los_Angeles" > /etc/timezone

# Copy necessary files from previous stages
COPY --from=source --chown=nextjs:nodejs /app ./

# Copy dependencies
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Create required directories and set permissions
RUN mkdir -p /app/src/migrations /app/public/media /app/.next && \
    chown -R nextjs:nodejs /app && \
    chmod -R 777 /app/.next

# Set the user to run the application
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "dev"]
