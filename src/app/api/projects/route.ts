import { NextResponse } from "next/server";
import { sql } from "@/lib/dbcontext";

// ✅ CREATE Project
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      longDescription,
      image,
      technologies,
      category,
      liveUrl,
      githubUrl,
      featured,
      status,
    } = body;

    const result = await sql`
      INSERT INTO projects (
        title, description, long_description, image, technologies, category, live_url, github_url, featured, status
      )
      VALUES (
        ${title}, ${description}, ${longDescription}, ${image},
        ${technologies}, ${category}, ${liveUrl}, ${githubUrl}, ${featured}, ${status}
      )
      RETURNING *;
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

// ✅ READ Projects
export async function GET() {
  try {
    // The query result is an object with a 'rows' property.
    const projects = await sql`SELECT * FROM projects;`;

    // Return the array of projects as a JSON response.
    return NextResponse.json(projects);

  } catch (err) {
    // It's good practice to provide a more specific error message.
    console.error('Failed to fetch projects:', err);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
