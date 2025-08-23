// app/api/contact/social-links/route.ts
import { NextResponse } from "next/server"
import { sql } from "@/lib/dbcontext"

export const GET = async () => {
  try {
    const links = await sql`SELECT name, icon, url, color FROM social_links`
    return NextResponse.json(links)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}