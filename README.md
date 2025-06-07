# Next.js with Payload CMS

This project focuses primarily on Next.js and Payload CMS - designed to explore the capabilities of these powerful technologies together. It includes three separate Payload CMS instances with different database backends to demonstrate various configurations and use cases.

## 🚀 Features

- **Next.js 15** with App Router
- **Multiple Payload CMS Instances**:
  - Demo Payload CMS 2025 (port 3000) - Full-featured demo application
  - Payload CMS with MongoDB (port 3001) - Standard Payload CMS with MongoDB backend
  - Payload CMS with PostgreSQL (port 3002) - Standard Payload CMS with PostgreSQL backend
- **Database Options**:
  - PostgreSQL (Dockerized)
  - MongoDB (Dockerized)
- **Docker Optimizations**:
  - Optimized multi-stage builds
  - Container security enhancements
  - Health checks and monitoring
  - Improved Docker Compose configuration
- TypeScript support
- GitHub Actions workflows
- Automated testing with [act CLI](https://github.com/nektos/act)
- Windsurf rules integration

## 🛠️ Prerequisites

- Node.js 20.0.0 or later
- npm or pnpm
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (required for the local development environment - both Payload CMS Next.js app and PostgreSQL database)
- [act CLI tool](https://github.com/nektos/act) (for local workflow testing)

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/TheRobBrennan/explore-payload-cms.git
   cd explore-payload-cms
   ```

2. **Start the development environment**

   ```bash
   npm start
   ```

   This will:
   - Start PostgreSQL and MongoDB Docker containers
   - Start all three Payload CMS instances in Docker containers
   - Show logs from all containers in the terminal

   Alternatively, to run in detached mode:

   ```bash
   npm run start:detached
   ```

3. **Clean start (if needed)**

   ```bash
   npm run start:clean
   ```

   This will:
   - Remove all Docker volumes (database data)
   - Rebuild the Docker images
   - Start fresh containers

4. **Environment Variables Setup**

   The project uses environment variables for configuration. The main environment variables are already set up in the root `.env` file and in the `config/env/` directory.

   Important environment variables:
   - `PAYLOAD_SECRET`: Used to encrypt JWT tokens
   - `DATABASE_URI`: PostgreSQL connection string for the PostgreSQL instance
   - `MONGODB_URI`: MongoDB connection string for the MongoDB instance
   - Port configuration:
     - `DEMO_PAYLOADCMS_2025_APP_PORT=3000`: Demo Payload CMS instance
     - `PAYLOAD_CMS_MONGO_APP_PORT=3001`: MongoDB-based Payload CMS instance
     - `PAYLOAD_CMS_POSTGRES_APP_PORT=3002`: PostgreSQL-based Payload CMS instance
   - Server URLs:
     - `NEXT_PUBLIC_SERVER_URL_DEMO_PAYLOADCMS_2025_APP`: URL for the Demo instance
     - `NEXT_PUBLIC_SERVER_URL_MONGO_APP`: URL for the MongoDB instance
     - `NEXT_PUBLIC_SERVER_URL_POSTGRES_APP`: URL for the PostgreSQL instance
   - `PREVIEW_SECRET`: Required for the live preview functionality

5. **Stop the environment**

   ```bash
   npm run stop
   ```

## 🔍 Available Instances

This project includes three separate Payload CMS instances:

### 1. Demo Payload CMS 2025 (Port 3000)

A full-featured demo application showcasing the capabilities of Payload CMS.

- **Admin Interface**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Features**: Complete demo with collections, fields, and example content

### 2. Payload CMS with MongoDB (Port 3001)

A standard Payload CMS instance using MongoDB as the database backend.

- **Admin Interface**: [http://localhost:3001/admin](http://localhost:3001/admin)
- **Features**: Standard Payload CMS setup with MongoDB integration

### 3. Payload CMS with PostgreSQL (Port 3002)

A standard Payload CMS instance using PostgreSQL as the database backend.

- **Admin Interface**: [http://localhost:3002/admin](http://localhost:3002/admin)
- **Features**: Standard Payload CMS setup with PostgreSQL integration

## 🔍 Live Preview Functionality

This project showcases Payload CMS's powerful live preview functionality, allowing content editors to see changes in real-time as they edit.

### Using Live Preview

1. Navigate to any of the admin interfaces listed above
2. Create or edit a page or post
3. The live preview panel will show your changes in real-time
4. You can switch between different device views (mobile, tablet, desktop)

### Troubleshooting Live Preview

If the live preview shows "You are not allowed to preview this page", ensure:

- The `PREVIEW_SECRET` environment variable is set in your `.env` file
- You've restarted the Payload CMS container after making changes to environment variables
- You're logged in as an authenticated user with appropriate permissions

## 🧪 Testing Workflows

This project includes GitHub Actions workflows that can be tested locally using the [act CLI tool](https://github.com/nektos/act).

### Available Test Commands

- `npm test` - Run all workflow tests
- `npm run test:workflows` - Test all workflows
- `npm run test:workflows:semantic` - Test semantic PR check with minor version bump
- `npm run test:workflows:semantic:major` - Test semantic PR check with major version bump
- `npm run test:workflows:semantic:minor` - Test semantic PR check with minor version bump
- `npm run test:workflows:semantic:patch` - Test semantic PR check with patch version bump
- `npm run test:workflows:semantic:invalid` - Test semantic PR check with invalid PR title
- `npm run test:workflows:merge` - Test merge workflow

## 🐳 Docker Enhancements

This project includes several Docker optimizations and improvements to enhance development and deployment experience:

### Optimized Multi-stage Builds

- Reduced image sizes for faster downloads and deployments
- Improved build performance with efficient layer caching
- Better layer organization for faster rebuilds during development

### Container Security

- Non-root user execution for all application containers
- Proper file permissions to follow security best practices
- Timezone configuration for consistent logging and scheduling

### Health Checks

- Added `/api/health` endpoints to all applications
- Implemented Docker health check configuration for better orchestration
- Improved container startup sequencing and dependency management

### Docker Compose Improvements

- Better service dependency management
- Consistent environment variable handling across services
- Container restart policies for improved reliability

## 🤖 GitHub Actions

This repository includes the following GitHub Actions workflows:

- **Semantic PR Check**: Validates PR titles against conventional commit messages
- **Main Merge**: Handles version bumping and changelog generation on merge to main

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Payload CMS](https://payloadcms.com/)
- [act CLI tool](https://github.com/nektos/act) for local GitHub Actions testing
