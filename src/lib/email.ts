// Email utility functions for contact form
export interface ContactEmailData {
  name: string
  email: string
  message: string
  subject: string
}

export interface EmailResult {
  success: boolean
  error?: string
}

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactEmailData): Promise<EmailResult> {
  try {
    const { name, email, message } = data

    await resend.emails.send({
      from: 'contact@yoursite.com',
      to: 'yousefelsharkawy@send.std',
      subject: `Contact Form: Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Sending contact email:", {
      to: "yousefelsharkawy@send.std", // Replace with your email
      from: email,
      subject: `Contact Form: Message from ${name}`,
      body: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })

    // Simulate async email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Email sent successfully")
    return { success: true }
  } catch (error) {
    console.error("Error in sendContactEmail:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Example implementation with Resend (commented out)
/*
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactEmailData): Promise<EmailResult> {
  try {
    const { name, email, message } = data;
    
    await resend.emails.send({
      from: 'contact@yoursite.com',
      to: 'admin@yoursite.com',
      subject: `Contact Form: Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
*/
