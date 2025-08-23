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