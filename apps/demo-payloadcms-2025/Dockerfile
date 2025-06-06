# Optimized multi-stage build for NativeBio Web 2025
# Simplified for direct app directory context

# Use a smaller Node.js base image
FROM node:18-alpine AS base
# Combine RUN commands to reduce layers
RUN apk add --no-cache python3 make g++ libc6-compat && \
    npm install -g cross-env && \
    corepack enable pnpm

# Dependencies stage - focused on efficient caching
FROM base AS deps
WORKDIR /app

# Copy only package files for better layer caching
COPY apps/nativebio-web-2025/package.json apps/nativebio-web-2025/pnpm-lock.yaml* ./

# Install production dependencies and ensure all required packages are installed
RUN pnpm install --no-frozen-lockfile && pnpm add tailwindcss postcss autoprefixer postcss-import sass

# Source files stage - prepare application code
FROM base AS source
WORKDIR /app

# Copy all source code and configuration files from the app directory
COPY apps/nativebio-web-2025/ .

# Production stage - minimal image with only what's needed to run
FROM base AS runner
WORKDIR /app

# Set runtime environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_SECRET=nativebio-payload-secret-key

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
# Copy the entire app directory to ensure we have all files
COPY --from=source --chown=nextjs:nodejs /app ./

# Copy dependencies
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Install additional dependencies needed for the application
RUN pnpm add tailwindcss postcss autoprefixer postcss-import sass

# Create required directories and set permissions
RUN mkdir -p /app/src/migrations /app/public/media /app/.next && \
    chown -R nextjs:nodejs /app && \
    chmod -R 777 /app/.next

# Set the user to run the application
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Command to run the application
CMD ["sh", "-c", "pnpm run db:init && pnpm run build && pnpm run start"]
