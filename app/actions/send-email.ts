"use server"

import { Resend } from "resend"
import { createContactSubmission } from "@/lib/db/contacts"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormData = {
  name: string
  email: string
  company: string
  aiType: string
  message: string
  referralSource?: string
  referrerName?: string
}

// Keep the original function for backward compatibility
export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Validate form data
    if (!formData.name || !formData.email || !formData.company || !formData.message) {
      return {
        success: false,
        error: "Please fill out all required fields",
      }
    }

    // Store the contact submission in the database
    await createContactSubmission({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message,
      subject: `New AI Security Assessment Request from ${formData.name}`,
    })

    // Prepare email content
    const subject = `New AI Security Assessment Request from ${formData.name}`

    // Create HTML email content
    const htmlContent = `
      <h1>New AI Security Assessment Request</h1>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Company:</strong> ${formData.company}</p>
      <p><strong>AI System Type:</strong> ${formData.aiType}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      ${formData.referralSource ? `<p><strong>Referral Source:</strong> ${formData.referralSource}</p>` : ""}
      ${formData.referrerName ? `<p><strong>Referrer's Name:</strong> ${formData.referrerName}</p>` : ""}
    `

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "ZeroLeaks <zeroleaks@resend.dev>", // Using Resend's default domain
      to: ["lucknitelol@proton.me"], // Your email address
      subject: subject,
      html: htmlContent,
      reply_to: formData.email,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        error: "Failed to send email. Please try again later.",
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Error in sendContactEmail:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}

// New function for form submissions using FormData
export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const company = formData.get("company") as string
  const message = formData.get("message") as string
  const subject = `New Contact Form Submission from ${name}`

  try {
    // Store the contact submission in the database
    await createContactSubmission({
      name,
      email,
      company,
      message,
      subject,
    })

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "ZeroLeaks <onboarding@resend.dev>",
      to: ["lucknitelol@proton.me"],
      subject: subject,
      reply_to: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return { success: false, message: "Failed to send email. Please try again later." }
    }

    return { success: true, message: "Email sent successfully!" }
  } catch (error) {
    console.error("Error in sendEmail:", error)
    return { success: false, message: "Failed to send email. Please try again later." }
  }
}

