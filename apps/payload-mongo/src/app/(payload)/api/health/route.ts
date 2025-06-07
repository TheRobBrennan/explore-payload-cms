import { NextResponse } from 'next/server'

/**
 * Simple health check endpoint for Docker container health checks
 * Returns a 200 OK response with a JSON payload
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'payload-mongo',
    },
    { status: 200 }
  )
}
