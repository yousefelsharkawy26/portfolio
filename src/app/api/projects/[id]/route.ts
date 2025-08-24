import { NextResponse } from "next/server";
import { sql } from '@/lib/dbcontext'
import { UUID } from "crypto";

type Params = Promise<{ id: UUID }>

export const PUT = async (request: Request, { params }: { params: Params }) => {

    try {
        const paramsData = await params;
        const { id } = paramsData;

        const { 
            title,
            description, 
            long_description, 
            image, 
            technologies, 
            category, 
            live_url, 
            github_url,
            featured, 
            status 
        } = await request.json();

        const query = await sql`Update projects
                                Set title=${title},
                                    description=${description}
                                    long_description=${long_description}
                                    image=${image}
                                    technologies=${technologies}
                                    category=${category}
                                    live_url=${live_url}
                                    github_url=${github_url}
                                    featured=${featured}
                                    status=${status}
                                Where id=${id}
                                RETURNING *
                            `
      return NextResponse.json(query[0])
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export const DELETE = async (request: Request, { params }: { params: Params }) => {
    try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    await sql`DELETE FROM projects WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}