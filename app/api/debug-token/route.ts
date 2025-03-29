import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { DB_PREFIXES, DB_COLLECTIONS } from "@/lib/db/index"
import { getSubscriberByEmail } from "@/lib/db/subscribers"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 })
  }

  try {
    // Check if token exists in KV store
    const tokenKey = `${DB_PREFIXES.TOKEN}${token}`
    const email = await kv.get(tokenKey)

    // Get all keys for debugging
    const allKeys = await kv.keys("*")
    const tokenKeys = await kv.keys(`${DB_PREFIXES.TOKEN}*`)

    // Check if there's a subscriber with this token
    const allSubscribers = await kv.smembers(DB_COLLECTIONS.SUBSCRIBERS)

    let subscriberWithToken = null
    const allSubscriberDetails = []

    for (const subId of allSubscribers) {
      const subscriber = await getSubscriberByEmail(subId)
      if (subscriber) {
        allSubscriberDetails.push({
          email: subscriber.email,
          confirmed: subscriber.confirmed,
          confirmationToken: subscriber.confirmationToken,
        })

        if (subscriber.confirmationToken === token) {
          subscriberWithToken = subscriber
        }
      }
    }

    return NextResponse.json({
      token,
      tokenKey,
      emailForToken: email,
      tokenExists: !!email,
      allKeys: allKeys.length,
      tokenKeys,
      subscribersCount: allSubscribers.length,
      subscriberWithToken,
      allSubscriberDetails,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Error checking token: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}

