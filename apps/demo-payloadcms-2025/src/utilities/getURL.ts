import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    // When running in a browser, always use the current window location
    // This ensures the browser renders content correctly
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port
    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  // Server-side code (not in browser)
  // For server-side code running in Docker, we need to use host.docker.internal
  // to communicate with the host machine
  if (process.env.NODE_ENV === 'development') {
    // In development, use the Docker-specific hostname for server-to-server communication
    return 'http://host.docker.internal:3000'
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  // Fallback to the environment variable
  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
