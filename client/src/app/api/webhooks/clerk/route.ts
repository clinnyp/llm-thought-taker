import { getHeaders } from '@/actions/utils'
import { apiBaseUrl } from '@/lib/utils'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'


export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)
    const eventType = evt.type

    switch (eventType) {
      case 'user.created':
        await createUser(evt.data)
        break
      case 'user.deleted':
        await deleteUser(evt.data)
        break
      default:
    }
    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}

async function createUser(payload: any) {

  try {
    const data = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      external_id: payload.id,
      email_address: payload.email_addresses[0]?.email_address || ''
    }
    const response = await fetch(`${apiBaseUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Api-Key': process.env.INTERNAL_API_KEY!,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to save user data')
    }
    return new Response('Webhook received', { status: 200 })
  } catch (error) {
    console.error('Error saving user data:', error)
  }



}

async function deleteUser(payload: any) {
  try {
    const response = await fetch(`${apiBaseUrl}/user/${payload.id}`, {
      method: 'DELETE',
      headers: await getHeaders()
    })
    if (!response.ok) {
      throw new Error('Failed to delete user data')
    }
    return new Response('Webhook received', { status: 200 })
  } catch (error) {
    console.error('Error deleting user data:', error)
  }
}