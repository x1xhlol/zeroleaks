import { v4 as uuidv4 } from "uuid"
import { kv } from "@vercel/kv"
import { create, get, update, remove, list, count, DB_PREFIXES, DB_COLLECTIONS } from "./index"

// Token expiration time (24 hours in seconds)
const TOKEN_EXPIRATION = 60 * 60 * 24

export interface Subscriber {
  id?: string
  email: string
  name?: string
  subscribedAt: string
  confirmed: boolean
  confirmationToken?: string
  unsubscribeToken?: string
  lastEmailSent?: string
  source?: string
  created_at?: string
  updated_at?: string
}

export async function createSubscriber(
  data: Omit<Subscriber, "id" | "subscribedAt" | "confirmed" | "confirmationToken" | "unsubscribeToken">,
): Promise<Subscriber> {
  const email = data.email.toLowerCase().trim()

  // Check if subscriber already exists
  const existing = await getSubscriberByEmail(email)
  if (existing) {
    if (existing.confirmed) {
      throw new Error("Email already subscribed")
    } else {
      // Resend confirmation if not confirmed
      return await regenerateConfirmationToken(email)
    }
  }

  // Generate tokens
  const confirmationToken = uuidv4()
  const unsubscribeToken = uuidv4()

  // Create subscriber
  const subscriber: Subscriber = {
    ...data,
    email,
    subscribedAt: new Date().toISOString(),
    confirmed: false,
    confirmationToken,
    unsubscribeToken,
  }

  // Store subscriber
  await create(DB_PREFIXES.SUBSCRIBER, email, subscriber, DB_COLLECTIONS.SUBSCRIBERS)

  // Store token mappings
  await kv.set(`${DB_PREFIXES.TOKEN}${confirmationToken}`, email, {
    ex: TOKEN_EXPIRATION,
  })

  await kv.set(`${DB_PREFIXES.UNSUBSCRIBE}${unsubscribeToken}`, email)

  return subscriber
}

export async function getSubscriber(id: string): Promise<Subscriber | null> {
  return await get<Subscriber>(DB_PREFIXES.SUBSCRIBER, id)
}

export async function getSubscriberByEmail(email: string): Promise<Subscriber | null> {
  return await get<Subscriber>(DB_PREFIXES.SUBSCRIBER, email.toLowerCase().trim())
}

export async function updateSubscriber(email: string, data: Partial<Subscriber>): Promise<Subscriber | null> {
  return await update<Subscriber>(DB_PREFIXES.SUBSCRIBER, email.toLowerCase().trim(), data)
}

export async function deleteSubscriber(email: string): Promise<boolean> {
  const subscriber = await getSubscriberByEmail(email)
  if (!subscriber) {
    return false
  }

  // Remove token mappings
  if (subscriber.confirmationToken) {
    await kv.del(`${DB_PREFIXES.TOKEN}${subscriber.confirmationToken}`)
  }

  if (subscriber.unsubscribeToken) {
    await kv.del(`${DB_PREFIXES.UNSUBSCRIBE}${subscriber.unsubscribeToken}`)
  }

  // Remove from confirmed subscribers if confirmed
  if (subscriber.confirmed) {
    await kv.srem(DB_COLLECTIONS.CONFIRMED_SUBSCRIBERS, email)
  }

  // Delete subscriber
  return await remove(DB_PREFIXES.SUBSCRIBER, email, DB_COLLECTIONS.SUBSCRIBERS)
}

// Update the confirmSubscription function with more robust error handling and debugging
export async function confirmSubscription(token: string): Promise<Subscriber | null> {
  try {
    // Get email from token
    console.log(`Looking up token in database: ${token}`)

    // Directly use KV to get the email associated with the token
    const tokenKey = `${DB_PREFIXES.TOKEN}${token}`
    console.log(`Full token key: ${tokenKey}`)

    // Try to get the email from KV
    let email
    try {
      email = await kv.get<string>(tokenKey)
      console.log(`KV get result for ${tokenKey}: ${email ? email : "null"}`)
    } catch (kvError) {
      console.error(`KV error when getting token: ${kvError instanceof Error ? kvError.message : String(kvError)}`)
      // Try a fallback approach - check if the token is stored in the subscriber record
      const allSubscribers = await list<Subscriber>(DB_COLLECTIONS.SUBSCRIBERS, 1000, 0)
      console.log(`Checking ${allSubscribers.length} subscribers for token match`)

      const matchingSubscriber = allSubscribers.find((sub) => sub.confirmationToken === token)
      if (matchingSubscriber) {
        email = matchingSubscriber.email
        console.log(`Found matching subscriber with email: ${email}`)
      }
    }

    if (!email) {
      console.log(`Token not found in database: ${token}`)
      // List all tokens for debugging
      try {
        const keys = await kv.keys(`${DB_PREFIXES.TOKEN}*`)
        console.log(`Available token keys: ${JSON.stringify(keys)}`)
      } catch (err) {
        console.error("Error listing token keys:", err)
      }
      return null
    }

    console.log(`Found email for token: ${email}`)

    // Get subscriber
    const subscriber = await getSubscriberByEmail(email)
    if (!subscriber) {
      console.log(`Subscriber not found for email: ${email}`)
      return null
    }

    console.log(`Found subscriber: ${JSON.stringify(subscriber)}`)

    // Update subscriber
    const updated = await updateSubscriber(email, {
      confirmed: true,
      confirmationToken: undefined, // Remove token
    })

    if (!updated) {
      console.log(`Failed to update subscriber: ${email}`)
      return null
    }

    // Delete token
    try {
      await kv.del(tokenKey)
      console.log(`Deleted token: ${tokenKey}`)
    } catch (delError) {
      console.error(`Error deleting token: ${delError instanceof Error ? delError.message : String(delError)}`)
      // Continue anyway, this is not critical
    }

    // Add to confirmed subscribers
    try {
      await kv.sadd(DB_COLLECTIONS.CONFIRMED_SUBSCRIBERS, email)
      console.log(`Added ${email} to confirmed subscribers collection`)
    } catch (addError) {
      console.error(
        `Error adding to confirmed subscribers: ${addError instanceof Error ? addError.message : String(addError)}`,
      )
      // Continue anyway, this is not critical
    }

    return updated
  } catch (error) {
    console.error(`Error in confirmSubscription: ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}

export async function unsubscribe(token: string): Promise<boolean> {
  // Get email from token
  const email = await kv.get<string>(`${DB_PREFIXES.UNSUBSCRIBE}${token}`)
  if (!email) {
    return false
  }

  // Delete subscriber
  const result = await deleteSubscriber(email)

  // Delete token
  await kv.del(`${DB_PREFIXES.UNSUBSCRIBE}${token}`)

  return result
}

export async function regenerateConfirmationToken(email: string): Promise<Subscriber> {
  const subscriber = await getSubscriberByEmail(email)
  if (!subscriber) {
    throw new Error("Subscriber not found")
  }

  // Delete old token if exists
  if (subscriber.confirmationToken) {
    await kv.del(`${DB_PREFIXES.TOKEN}${subscriber.confirmationToken}`)
  }

  // Generate new token
  const confirmationToken = uuidv4()

  // Update subscriber
  const updated = await updateSubscriber(email, {
    confirmationToken,
  })

  if (!updated) {
    throw new Error("Failed to update subscriber")
  }

  // Store token mapping
  await kv.set(`${DB_PREFIXES.TOKEN}${confirmationToken}`, email, {
    ex: TOKEN_EXPIRATION,
  })

  return updated
}

export async function listSubscribers(limit = 100, offset = 0, confirmedOnly = false): Promise<Subscriber[]> {
  const collection = confirmedOnly ? DB_COLLECTIONS.CONFIRMED_SUBSCRIBERS : DB_COLLECTIONS.SUBSCRIBERS

  return await list<Subscriber>(collection, limit, offset)
}

export async function countSubscribers(confirmedOnly = false): Promise<number> {
  const collection = confirmedOnly ? DB_COLLECTIONS.CONFIRMED_SUBSCRIBERS : DB_COLLECTIONS.SUBSCRIBERS

  return await count(collection)
}

