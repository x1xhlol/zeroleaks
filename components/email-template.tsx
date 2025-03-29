import type * as React from "react"
import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Button, Hr } from "@react-email/components"

interface EmailTemplateProps {
  firstName: string
  confirmationLink: string
  previewText: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName, confirmationLink, previewText }) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Text style={logoText}>ZeroLeaks</Text>
          </Section>
          <Section style={content}>
            <Heading style={heading}>Confirm Your Subscription</Heading>
            <Text style={paragraph}>Hello {firstName},</Text>
            <Text style={paragraph}>
              Thank you for subscribing to the ZeroLeaks newsletter! We're excited to share the latest insights on AI
              security, system prompt protection, and industry best practices with you.
            </Text>
            <Text style={paragraph}>
              To complete your subscription and start receiving our newsletter, please confirm your email address by
              clicking the button below:
            </Text>
            <Section style={buttonContainer}>
              <Button pX={20} pY={12} style={button} href={confirmationLink}>
                Confirm Subscription
              </Button>
            </Section>
            <Text style={paragraph}>
              If the button doesn't work, you can also confirm by copying and pasting this link into your browser:
            </Text>
            <Text style={paragraph}>
              <Link href={confirmationLink} style={link}>
                {confirmationLink}
              </Link>
            </Text>
            <Text style={paragraph}>If you didn't request this subscription, you can safely ignore this email.</Text>
            <Hr style={hr} />
            <Text style={footer}>© {new Date().getFullYear()} ZeroLeaks. All rights reserved.</Text>
            <Text style={footer}>Our address: 123 AI Security Ave, Digital City, DC 10101</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
  borderRadius: "5px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
}

const logoContainer = {
  marginTop: "32px",
  textAlign: "center" as const,
}

const logoText = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#8b5cf6",
}

const content = {
  padding: "0 48px",
}

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  textAlign: "center" as const,
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
}

const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "32px",
  marginBottom: "32px",
}

const button = {
  backgroundColor: "#8b5cf6",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
}

const link = {
  color: "#8b5cf6",
  textDecoration: "underline",
  fontSize: "14px",
}

const hr = {
  borderColor: "#e6ebf1",
  margin: "42px 0 26px",
}

const footer = {
  fontSize: "12px",
  lineHeight: "20px",
  color: "#9ca3af",
  textAlign: "center" as const,
  marginBottom: "10px",
}

