import { type NextRequest, NextResponse } from "next/server"
import { unsubscribeFromNewsletter } from "@/app/actions/subscribe-newsletter"

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(new URL("/newsletter/unsubscribed?error=missing-token", request.url))
  }

  try {
    const result = await unsubscribeFromNewsletter(token)

    if (result.success) {
      return NextResponse.redirect(
        new URL(
          `/newsletter/unsubscribed?success=true&message=${encodeURIComponent(result.message || "")}`,
          request.url,
        ),
      )
    } else {
      return NextResponse.redirect(
        new URL(`/newsletter/unsubscribed?error=${encodeURIComponent(result.error || "unknown-error")}`, request.url),
      )
    }
  } catch (error) {
    console.error("Error unsubscribing:", error)
    return NextResponse.redirect(new URL("/newsletter/unsubscribed?error=server-error", request.url))
  }
}

