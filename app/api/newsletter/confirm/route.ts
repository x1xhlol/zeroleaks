import { type NextRequest, NextResponse } from "next/server"
import { confirmNewsletterSubscription } from "@/app/actions/subscribe-newsletter"

const DB_PREFIXES = {
  TOKEN: "newsletter:token:",
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")
  const url = request.url

  console.log("Confirm request URL:", url)
  console.log("Extracted token:", token)

  if (!token) {
    console.log("Missing token in confirmation request")
    return NextResponse.redirect(new URL("/newsletter/confirmation?error=missing-token", request.url))
  }

  try {
    console.log(`Processing confirmation for token: ${token}`)

    // Check if token exists in KV store directly
    const tokenKey = `${DB_PREFIXES.TOKEN}${token}`
    const kv = (await import("@vercel/kv")).kv
    const email = await kv.get(tokenKey)
    console.log(`Direct KV check for token ${token}: ${email ? "Found" : "Not found"}`)

    const result = await confirmNewsletterSubscription(token)

    if (result.success) {
      console.log("Confirmation successful, redirecting to success page")
      return NextResponse.redirect(
        new URL(
          `/newsletter/confirmation?success=true&message=${encodeURIComponent(result.message || "")}`,
          request.url,
        ),
      )
    } else {
      console.log(`Confirmation failed: ${result.error}`)
      return NextResponse.redirect(
        new URL(`/newsletter/confirmation?error=${encodeURIComponent(result.error || "unknown-error")}`, request.url),
      )
    }
  } catch (error) {
    console.error("Error in confirmation route:", error)
    return NextResponse.redirect(new URL("/newsletter/confirmation?error=server-error", request.url))
  }
}

