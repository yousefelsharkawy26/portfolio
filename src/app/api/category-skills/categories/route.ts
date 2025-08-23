import { NextResponse } from "next/server";
import { sql } from "@/lib/dbcontext";

export async function GET() {
    try {
        const categories = await sql`SELECT * FROM skill_categories`;
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
};