import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { DB_PREFIXES } from "@/lib/db/index"
import { updateSubscriber } from "@/lib/db/subscribers"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get("token")
  const email = url.searchParams.get("email")

  if (!token || !email) {
    return NextResponse.json({ error: "Token and email are required" }, { status: 400 })
  }

  try {
    // Store token in KV with a long expiration (7 days)
    const tokenKey = `${DB_PREFIXES.TOKEN}${token}`
    await kv.set(tokenKey, email, { ex: 60 * 60 * 24 * 7 })

    // Verify the token was stored
    const verifiedEmail = await kv.get(tokenKey)

    // Update the subscriber record as well
    let subscriberUpdated = false
    try {
      const updated = await updateSubscriber(email, { confirmationToken: token })
      subscriberUpdated = !!updated
    } catch (err) {
      // Ignore errors here
    }

    return NextResponse.json({
      success: true,
      token,
      email,
      tokenKey,
      verificationResult: verifiedEmail ? `Token stored for ${verifiedEmail}` : "Token not stored",
      subscriberUpdated,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Error storing token: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}

