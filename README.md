# Next.js with Payload CMS

This project focuses primarily on Next.js and Payload CMS - designed to explore the capabilities of these powerful technologies together.

## 🚀 Features

- **Next.js 15** with App Router
- **Payload CMS** for content management
  - Live preview functionality for real-time content editing
  - Rich text editing with Lexical editor
  - SEO fields and optimization
- **PostgreSQL** database (Dockerized)
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
   - Start a PostgreSQL Docker container
   - Start the Payload CMS in a Docker container
   - Show logs from both containers in the terminal

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

   The project uses environment variables for configuration. Copy the `.env.example` file to `.env` in the `apps/payloadcms` directory:

   ```bash
   cp apps/payloadcms/.env.example apps/payloadcms/.env
   ```

   Important environment variables:
   - `PAYLOAD_SECRET`: Used to encrypt JWT tokens
   - `DATABASE_URI`: PostgreSQL connection string
   - `NEXT_PUBLIC_SERVER_URL`: URL for the server
   - `PREVIEW_SECRET`: Required for the live preview functionality

5. **Stop the environment**

   ```bash
   npm run stop
   ```

## 🔍 Live Preview Functionality

This project showcases Payload CMS's powerful live preview functionality, allowing content editors to see changes in real-time as they edit.

### Using Live Preview

1. Navigate to the admin interface at [http://localhost:3000/admin](http://localhost:3000/admin)
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

## 🤖 GitHub Actions

This repository includes the following GitHub Actions workflows:

- **Semantic PR Check**: Validates PR titles against conventional commit messages
- **Main Merge**: Handles version bumping and changelog generation on merge to main

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Payload CMS](https://payloadcms.com/)
- [act CLI tool](https://github.com/nektos/act) for local GitHub Actions testing
