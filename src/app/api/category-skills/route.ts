import { NextResponse } from "next/server";
import { sql } from "@/lib/dbcontext";

export async function GET() {
    try {
        const categories = await sql`SELECT sc.title AS title, array_agg(json_build_object('name', s.name, 'level', s.level)) AS skills
                                        FROM skill_categories sc
                                        LEFT JOIN skills s ON sc.id = s.category_id
                                        GROUP BY sc.id, sc.title
                                        ORDER BY sc.title`;
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
};