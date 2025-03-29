import { kv } from "@vercel/kv"

// Database namespace prefixes to avoid key collisions
export const DB_PREFIXES = {
  SUBSCRIBER: "subscriber:",
  CONTACT: "contact:",
  TOKEN: "token:",
  UNSUBSCRIBE: "unsubscribe:",
  BLOG_POST: "blog:",
  BLOG_SLUG: "blog_slug:",
  SETTINGS: "settings:",
}

// Collections for listing items
export const DB_COLLECTIONS = {
  SUBSCRIBERS: "subscribers",
  CONFIRMED_SUBSCRIBERS: "confirmed_subscribers",
  CONTACTS: "contacts",
  BLOG_POSTS: "blog_posts",
}

// Generic CRUD operations
export async function create<T extends Record<string, any>>(
  prefix: string,
  id: string,
  data: T,
  collection?: string,
): Promise<T> {
  const key = `${prefix}${id}`

  // Add created_at timestamp if not present
  if (!data.created_at) {
    data.created_at = new Date().toISOString()
  }

  // Store the data
  await kv.hset(key, data)

  // Add to collection if specified
  if (collection) {
    await kv.sadd(collection, id)
  }

  return data
}

// Update the get function to add better error handling
export async function get<T>(prefix: string, id: string): Promise<T | null> {
  try {
    const key = `${prefix}${id}`
    console.log(`Fetching data for key: ${key}`)
    const data = await kv.hgetall(key)

    if (!data || Object.keys(data).length === 0) {
      console.log(`No data found for key: ${key}`)
      return null
    }

    console.log(`Found data for key: ${key}`)
    return data
  } catch (error) {
    console.error(`Error fetching data for ${prefix}${id}:`, error)
    return null
  }
}

// Update the update function with better error handling
export async function update<T extends Record<string, any>>(
  prefix: string,
  id: string,
  data: Partial<T>,
): Promise<T | null> {
  try {
    const key = `${prefix}${id}`
    console.log(`Updating data for key: ${key}`)

    // Check if the record exists first
    const existing = await kv.hgetall(key)
    if (!existing || Object.keys(existing).length === 0) {
      console.log(`Cannot update non-existent record: ${key}`)
      return null
    }

    // Add updated_at timestamp
    data.updated_at = new Date().toISOString()

    // Update the data
    await kv.hset(key, data)
    console.log(`Successfully updated data for key: ${key}`)

    // Return the updated object
    return await kv.hgetall(key)
  } catch (error) {
    console.error(`Error updating data for ${prefix}${id}:`, error)
    return null
  }
}

export async function remove(prefix: string, id: string, collection?: string): Promise<boolean> {
  const key = `${prefix}${id}`

  // Remove from collection if specified
  if (collection) {
    await kv.srem(collection, id)
  }

  // Delete the data
  return (await kv.del(key)) > 0
}

export async function list<T>(collection: string, limit = 100, offset = 0): Promise<T[]> {
  // Get IDs from the collection
  const ids = await kv.smembers(collection)

  // Apply pagination
  const paginatedIds = ids.slice(offset, offset + limit)

  if (paginatedIds.length === 0) {
    return []
  }

  // Get data for each ID
  const prefix = getKeyPrefixForCollection(collection)
  if (!prefix) {
    throw new Error(`Unknown collection: ${collection}`)
  }

  const items: T[] = []
  for (const id of paginatedIds) {
    const item = await get<T>(prefix, id)
    if (item) {
      // Add the ID to the item
      ;(item as any).id = id
      items.push(item)
    }
  }

  return items
}

export async function count(collection: string): Promise<number> {
  return await kv.scard(collection)
}

// Helper to get the key prefix for a collection
function getKeyPrefixForCollection(collection: string): string | null {
  switch (collection) {
    case DB_COLLECTIONS.SUBSCRIBERS:
    case DB_COLLECTIONS.CONFIRMED_SUBSCRIBERS:
      return DB_PREFIXES.SUBSCRIBER
    case DB_COLLECTIONS.CONTACTS:
      return DB_PREFIXES.CONTACT
    case DB_COLLECTIONS.BLOG_POSTS:
      return DB_PREFIXES.BLOG_POST
    default:
      return null
  }
}

