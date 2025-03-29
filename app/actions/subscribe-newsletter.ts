"use server"

import { Resend } from "resend"
import {
  createSubscriber,
  confirmSubscription,
  unsubscribe,
  getSubscriberByEmail,
  updateSubscriber,
} from "@/lib/db/subscribers"
import { DB_COLLECTIONS } from "@/lib/db/constants"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter(email: string) {
  try {
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return {
        success: false,
        error: "Please provide a valid email address",
      }
    }

    try {
      // Create or update subscriber
      const subscriber = await createSubscriber({ email })

      // Send confirmation email
      await sendConfirmationEmail(email, subscriber.confirmationToken!)

      return {
        success: true,
        message: "Thank you for subscribing! Please check your inbox to confirm your subscription.",
      }
    } catch (error: any) {
      if (error.message === "Email already subscribed") {
        return {
          success: false,
          error: "This email is already subscribed to our newsletter",
        }
      }

      throw error
    }
  } catch (error) {
    console.error("Error in subscribeToNewsletter:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}

// Update the sendConfirmationEmail function to use a direct approach
async function sendConfirmationEmail(email: string, token: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zeroleaks.vercel.app"
    // Fix the URL construction to ensure no double slashes
    const cleanBaseUrl = baseUrl.replace(/\/+$/, "") // Remove any trailing slashes
    const confirmationLink = `${cleanBaseUrl}/newsletter/confirm/${token}`
    const unsubscribeLink = `${cleanBaseUrl}/newsletter/unsubscribe/${token}`

    // Log the generated URLs for debugging
    console.log("Generated confirmation link:", confirmationLink)

    // Store token directly in KV with a longer expiration time
    try {
      const { kv } = await import("@vercel/kv")
      const tokenKey = `token:${token}`

      // First, check if the token already exists
      const existingEmail = await kv.get(tokenKey)
      console.log(`Checking if token already exists: ${existingEmail ? `Found for ${existingEmail}` : "Not found"}`)

      // Set the token with a long expiration (7 days)
      await kv.set(tokenKey, email, { ex: 60 * 60 * 24 * 7 })
      console.log(`Stored token ${token} for email ${email} with 7-day expiration`)

      // Verify the token was stored
      const verifiedEmail = await kv.get(tokenKey)
      console.log(`Verification - Token ${token} in KV store: ${verifiedEmail ? `Yes, for ${verifiedEmail}` : "No"}`)

      if (!verifiedEmail) {
        console.error(`Failed to store token in KV store. Will try alternative storage.`)
        // As a fallback, make sure the token is stored in the subscriber record
        const subscriber = await getSubscriberByEmail(email)
        if (subscriber) {
          await updateSubscriber(email, { confirmationToken: token })
          console.log(`Updated subscriber record with token as fallback`)
        }
      }
    } catch (err) {
      console.error(`Error storing token in KV: ${err instanceof Error ? err.message : String(err)}`)
    }

    // Rest of the email sending code remains the same...
    // [HTML email content and sending logic]

    const firstName = email.split("@")[0]
    const previewText = "Confirm your subscription to ZeroLeaks newsletter"

    // Create an improved HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Confirm Your ZeroLeaks Subscription</title>
          <style type="text/css">
            /* Base styles */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
            img { -ms-interpolation-mode: bicubic; }
            
            /* iOS blue links */
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
            }
            
            /* Mobile styles */
            @media screen and (max-width: 600px) {
              .mobile-padding {
                padding-left: 10px !important;
                padding-right: 10px !important;
              }
              .mobile-stack {
                display: block !important;
                width: 100% !important;
              }
              .logo {
                margin: 0 auto !important;
              }
              .mobile-center {
                text-align: center !important;
              }
            }
          </style>
        </head>
        <body style="background-color: #f8f9fa; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8f9fa;" width="100%">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <!--[if mso]>
                <table role="presentation" align="center" style="width:600px;">
                <tr>
                <td>
                <![endif]-->
                
                <!-- Email Header -->
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; width: 100%;">
                  <tr>
                    <td align="center" style="padding: 20px 0; text-align: center;">
                      <h1 style="color: #8b5cf6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 700; margin: 0;">ZeroLeaks</h1>
                    </td>
                  </tr>
                </table>
                
                <!-- Email Body -->
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); max-width: 600px; width: 100%;">
                  <!-- Hero Section -->
                  <tr>
                    <td style="padding: 40px 30px 0; text-align: center;">
                      <h1 style="color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 700; line-height: 36px; margin: 0 0 20px;">Confirm Your Subscription</h1>
                      <p style="color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; margin: 0 0 10px;">Hello ${firstName},</p>
                      <p style="color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; margin: 0 0 20px;">Thank you for subscribing to the <strong>ZeroLeaks newsletter</strong>! We're excited to share the latest insights on AI security, system prompt protection, and industry best practices with you.</p>
                    </td>
                  </tr>
                  
                  <!-- Divider -->
                  <tr>
                    <td style="padding: 0 30px;">
                      <hr style="border: 0; border-top: 1px solid #f0f0f0; margin: 30px 0;">
                    </td>
                  </tr>
                  
                  <!-- Confirmation Section -->
                  <tr>
                    <td style="padding: 0 30px 30px; text-align: center;">
                      <p style="color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; margin: 0 0 20px;">To complete your subscription and start receiving our newsletter, please confirm your email address:</p>
                      
                      <!-- Button -->
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto;">
                        <tr>
                          <td align="center" bgcolor="#8b5cf6" style="border-radius: 4px;">
                            <a href="${confirmationLink}" target="_blank" style="background-color: #8b5cf6; border-radius: 4px; color: #ffffff; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 24px; padding: 12px 24px; text-align: center; text-decoration: none;">Confirm Subscription</a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 21px; margin: 20px 0 0;">If the button doesn't work, you can also confirm by copying and pasting this link into your browser:</p>
                      <p style="color: #8b5cf6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 21px; margin: 10px 0 0; word-break: break-all;">
                        <a href="${confirmationLink}" style="color: #8b5cf6; text-decoration: underline;">${confirmationLink}</a>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- What to Expect Section -->
                  <tr>
                    <td style="background-color: #f9f9ff; border-radius: 0 0 8px 8px; padding: 30px;">
                      <h2 style="color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; line-height: 24px; margin: 0 0 15px;">What to expect from our newsletter:</h2>
                      <ul style="color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; margin: 0 0 20px; padding-left: 20px;">
                        <li style="margin-bottom: 10px;">Latest AI security insights and trends</li>
                        <li style="margin-bottom: 10px;">System prompt protection strategies</li>
                        <li style="margin-bottom: 10px;">Exclusive content and resources</li>
                        <li>Industry best practices and case studies</li>
                      </ul>
                      <p style="color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-style: italic; line-height: 21px; margin: 0;">If you didn't request this subscription, you can safely ignore this email.</p>
                    </td>
                  </tr>
                </table>
                
                <!-- Footer -->
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; width: 100%;">
                  <tr>
                    <td style="padding: 30px 0; text-align: center;">
                      <p style="color: #999999; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 18px; margin: 20px 0 5px;">© ${new Date().getFullYear()} ZeroLeaks. All rights reserved.</p>
                      <p style="color: #999999; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 18px; margin: 0 0 5px;">123 AI Security Ave, Digital City, DC 10101</p>
                      <p style="color: #999999; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 18px; margin: 0;">
                        <a href="${baseUrl}/privacy" target="_blank" style="color: #8b5cf6; text-decoration: underline;">Privacy Policy</a> | 
                        <a href="${baseUrl}/terms" target="_blank" style="color: #8b5cf6; text-decoration: underline;">Terms of Service</a> | 
                        <a href="${unsubscribeLink}" target="_blank" style="color: #8b5cf6; text-decoration: underline;">Unsubscribe</a>
                      </p>
                    </td>
                  </tr>
                </table>
                
                <!--[if mso]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
          </table>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "ZeroLeaks <zeroleaks@ciph3r.lucknite.tech>",
      to: [email],
      subject: "Confirm Your ZeroLeaks Newsletter Subscription",
      html: htmlContent,
    })

    if (error) {
      console.error("Error sending confirmation email:", error)
      throw new Error("Failed to send confirmation email")
    }

    return data
  } catch (error) {
    console.error("Error in sendConfirmationEmail:", error)
    throw error
  }
}

// Update the confirmNewsletterSubscription function to directly manipulate the subscriber status

export async function confirmNewsletterSubscription(token: string) {
  try {
    console.log(`Confirming subscription with token: ${token}`)

    if (!token || token.trim() === "") {
      return {
        success: false,
        error: "Invalid confirmation token. Please check your email and try again.",
      }
    }

    // Try direct KV access first
    try {
      const { kv } = await import("@vercel/kv")
      const tokenKey = `token:${token}`
      const email = await kv.get<string>(tokenKey)

      if (email) {
        console.log(`Found email ${email} for token in KV store`)

        try {
          // Get the subscriber directly and check if it exists
          const subscriber = await getSubscriberByEmail(email)
          console.log(`Subscriber lookup result:`, subscriber ? "Found" : "Not found")

          if (!subscriber) {
            console.log(`Creating new subscriber for ${email} since none was found`)
            // Create a new subscriber if none exists
            const newSubscriber = {
              email,
              subscribedAt: new Date().toISOString(),
              confirmed: true,
            }

            try {
              await kv.hset(`subscriber:${email}`, newSubscriber)
              console.log(`Created new subscriber record for ${email}`)

              await kv.sadd(DB_COLLECTIONS.SUBSCRIBERS, email)
              console.log(`Added ${email} to subscribers collection`)

              await kv.sadd(DB_COLLECTIONS.CONFIRMED_SUBSCRIBERS, email)
              console.log(`Added ${email} to confirmed subscribers collection`)

              // Delete the token since we've used it
              await kv.del(tokenKey)
              console.log(`Deleted token ${token}`)

              return {
                success: true,
                message: "Your subscription has been confirmed! You'll now receive our newsletter updates.",
              }
            } catch (createError) {
              console.error(
                `Error creating new subscriber: ${createError instanceof Error ? createError.message : String(createError)}`,
              )
              // Continue to fallback method
            }
          } else {
            // Update the subscriber directly with KV
            console.log(`Updating subscriber ${email} to confirmed status`)
            try {
              await kv.hset(`subscriber:${email}`, {
                confirmed: true,
                confirmationToken: null, // Remove token reference
                updated_at: new Date().toISOString(),
              })
              console.log(`Updated subscriber record for ${email}`)

              // Add to confirmed subscribers set
              await kv.sadd(DB_COLLECTIONS.CONFIRMED_SUBSCRIBERS, email)
              console.log(`Added ${email} to confirmed subscribers collection`)

              // Delete the token since we've used it
              await kv.del(tokenKey)
              console.log(`Deleted token ${token}`)

              return {
                success: true,
                message: "Your subscription has been confirmed! You'll now receive our newsletter updates.",
              }
            } catch (updateError) {
              console.error(
                `Error updating subscriber: ${updateError instanceof Error ? updateError.message : String(updateError)}`,
              )
              // Continue to fallback method
            }
          }
        } catch (subscriberError) {
          console.error(
            `Error getting subscriber: ${subscriberError instanceof Error ? subscriberError.message : String(subscriberError)}`,
          )
          // Continue to fallback method
        }

        // If we got here, the direct KV operations failed, but we still have the email
        // Let's try a simpler approach - just mark the email as confirmed
        try {
          console.log(`Attempting simplified confirmation for ${email}`)

          // Just add the email to the confirmed subscribers set
          await kv.sadd(DB_COLLECTIONS.CONFIRMED_SUBSCRIBERS, email)
          console.log(`Added ${email} to confirmed subscribers collection (simplified approach)`)

          // Delete the token
          await kv.del(tokenKey)

          return {
            success: true,
            message: "Your subscription has been confirmed! You'll now receive our newsletter updates.",
          }
        } catch (simplifiedError) {
          console.error(
            `Error in simplified confirmation: ${simplifiedError instanceof Error ? simplifiedError.message : String(simplifiedError)}`,
          )
          // Continue to fallback method
        }
      } else {
        console.log("No email found for token in KV store")
      }
    } catch (kvError) {
      console.error(`KV error: ${kvError instanceof Error ? kvError.message : String(kvError)}`)
    }

    // If direct approach didn't work, try the regular method as fallback
    console.log("Trying fallback confirmation method")
    const subscriber = await confirmSubscription(token)

    if (!subscriber) {
      console.log("Confirmation failed: subscriber not found or could not be updated")
      return {
        success: false,
        error: "Invalid or expired confirmation link. Please try subscribing again.",
      }
    }

    console.log(`Successfully confirmed subscription for: ${subscriber.email}`)
    return {
      success: true,
      message: "Your subscription has been confirmed! You'll now receive our newsletter updates.",
    }
  } catch (error) {
    console.error(`Error in confirmNewsletterSubscription: ${error instanceof Error ? error.message : String(error)}`)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}

export async function unsubscribeFromNewsletter(token: string) {
  try {
    const result = await unsubscribe(token)

    if (!result) {
      return {
        success: false,
        error: "Invalid unsubscribe link.",
      }
    }

    return {
      success: true,
      message: "You have been successfully unsubscribed from our newsletter.",
    }
  } catch (error) {
    console.error("Error in unsubscribe:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}

