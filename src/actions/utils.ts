'use server'

import { auth } from "@clerk/nextjs/server"

export const getHeaders = async () => {
  try {
    const { getToken } = await auth()
    const token = await getToken()

    return {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  } catch (error) {
    console.error('Failed to get auth token:', error)
  }
}