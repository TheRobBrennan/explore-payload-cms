# Next.js with Payload CMS

This project focuses primarily on Next.js and Payload CMS - designed to explore the capabilities of these powerful technologies together.

## 🚀 Features

- **Next.js 15** with App Router
- **Payload CMS** for content management
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

4. **Stop the environment**

   ```bash
   npm run stop
   ```

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
