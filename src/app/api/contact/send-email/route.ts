import { sendContactEmail } from "@/lib/email"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    console.log("Received contact form request", request)

    const { name, email, subject ,message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const result = await sendContactEmail({ name, email, message, subject })

    if (!result.success) {
      return NextResponse.json({ message: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}