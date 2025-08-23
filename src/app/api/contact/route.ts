// app/api/contact/route.ts
import { NextResponse } from "next/server"
import { sql } from "@/lib/dbcontext"

export const GET = async () => {
  try {
    const contact = await sql`SELECT * FROM contact_info`
    return NextResponse.json(contact)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export const POST = async (request: Request) => {
  try {
    const { icon, title, details, link, color } = await request.json()

    if (!icon || !title || !details) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const newContact = await sql`INSERT INTO contact_info (icon, title, details, link, color) 
                                 VALUES (${icon}, ${title}, ${details}, ${link}, ${color}) 
                                 RETURNING *`

    return NextResponse.json(newContact[0], { status: 201 })
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}



