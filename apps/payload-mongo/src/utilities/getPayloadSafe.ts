import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getPayloadSafe() {
  // Skip database connection during build if placeholder URI is used
  if (process.env.MONGODB_URI?.includes('placeholder') || !process.env.MONGODB_URI) {
    return null
  }

  try {
    return await getPayload({ config: configPromise })
  } catch (error) {
    console.warn('Failed to connect to database:', error)
    return null
  }
}