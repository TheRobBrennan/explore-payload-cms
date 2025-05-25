# ACT Testing and Container Management

This document explains how the ACT testing framework is used in the NativeBio project and how we manage Docker containers created during testing.

## Overview

We use [act](https://github.com/nektos/act) to test GitHub Actions workflows locally. This allows us to verify that our workflows function correctly before pushing changes to GitHub.

## Container Cleanup

When running tests with ACT, Docker containers are created to simulate the GitHub Actions environment. Sometimes these containers may not be properly cleaned up, especially if a test is interrupted or fails.

### Automatic Cleanup

We've implemented automatic container cleanup in our testing scripts:

1. Before running any tests, orphaned containers from previous test runs are removed
2. After each individual test, containers from that test are cleaned up
3. At the end of the test suite, a final cleanup is performed to ensure no containers are left behind

### Manual Cleanup

You can manually clean up orphaned ACT containers using the following npm script:

```bash
npm run test:cleanup
```

This command will find and remove all Docker containers that were created by ACT.

## Implementation Details

The cleanup functionality is implemented in two places:

1. `.github/test-workflows.sh` - Contains the `cleanup_act_containers()` function that is called before and after each test
2. `package.json` - Contains the `test:cleanup` script for manual cleanup

### Cleanup Function

The cleanup function works by:

1. Finding all Docker containers with "act" in their name
2. Removing these containers forcefully

```bash
cleanup_act_containers() {
  echo "🧹 Cleaning up act containers..."
  orphaned_containers=$(docker ps -a | grep act | awk '{print $1}')
  if [ -n "$orphaned_containers" ]; then
    echo "Found orphaned containers: $orphaned_containers"
    docker rm -f $orphaned_containers
    echo "✅ Containers removed successfully"
  else
    echo "No orphaned containers found"
  fi
}
```

## Best Practices

- Always run the full test suite with `npm run test:workflows` rather than individual tests to ensure proper cleanup
- If you need to interrupt a test, run `npm run test:cleanup` afterwards to remove any orphaned containers
- Before running Docker commands that might conflict with ACT containers, run the cleanup script to free up resources
