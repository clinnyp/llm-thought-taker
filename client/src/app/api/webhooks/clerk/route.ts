import { apiBaseUrl } from '@/actions/utils'
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
      email_address: payload.email_addresses[0].email_address
    }
    const response = await fetch(`${apiBaseUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to save user data')
    }
    const responseData = await response.json()
    return new Response('Webhook received', { status: 200 })
  } catch (error) {
    console.error('Error saving user data:', error)
  }

}