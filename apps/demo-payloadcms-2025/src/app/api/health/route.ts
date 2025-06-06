import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Docker container health checks
 * @returns Status 200 with health information
 */
export async function GET() {
  const healthInfo = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || 'development',
    environment: process.env.NODE_ENV,
    service: 'nativebio-web-2025',
  };

  return NextResponse.json(healthInfo, { status: 200 });
}
