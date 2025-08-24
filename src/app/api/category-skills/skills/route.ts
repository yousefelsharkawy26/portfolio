import { NextResponse } from "next/server";
import { sql } from "@/lib/dbcontext";

export async function GET() {
    try {
        const skills = await sql`SELECT * FROM skills`;
        return NextResponse.json(skills);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
    const { name, level, category_id } = await req.json()

    if (!name || !level || !category_id || category_id <= 0) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const newContact = await sql`INSERT INTO skills (name, level, category_id) 
                                 VALUES (${name}, ${level}, ${category_id}) 
                                 RETURNING *`

    return NextResponse.json(newContact[0], { status: 201 })
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}