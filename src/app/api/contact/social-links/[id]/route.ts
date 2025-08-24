import { sql } from "@/lib/dbcontext";
import { NextResponse } from "next/server";

type Params = Promise<{ id: number }>

export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  try {
    
    const paramsData = await params;
    const { id } = paramsData;
    

    const {  name, icon, url, color } = await request.json()

    if (!id || !name || !url) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const updatedContact = await sql`
      UPDATE social_links 
      SET icon = ${icon}, 
          name = ${name}, 
          url = ${url}, 
          color = ${color} 
      WHERE id = ${id} 
      RETURNING *
    `

    return NextResponse.json(updatedContact[0])
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export const DELETE = async (request: Request, { params }: { params: Params}) => {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    await sql`DELETE FROM social_links WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}