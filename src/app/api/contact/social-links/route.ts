// app/api/contact/social-links/route.ts
import { NextResponse } from "next/server"
import { sql } from "@/lib/dbcontext"

export const GET = async () => {
  try {
    const links = await sql`SELECT * FROM social_links`
    return NextResponse.json(links)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export const POST = async (request: Request) => {
  try {
    const {  name, icon, url, color } = await request.json()

    if (!name || !url) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const newContact = await sql`INSERT INTO social_links (name, icon, url, color) 
                                 VALUES (${name}, ${icon}, ${url}, ${color}) 
                                 RETURNING *`

    return NextResponse.json(newContact[0], { status: 201 })
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}