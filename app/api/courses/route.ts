import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

const formatSearchTerm = (term: string) => {
  return term.trim().split(/\s+/).join(" & "); // Transformă "web development" în "web & development"
};

// 🔹 Handler pentru metoda GET (căutare cursuri)
export async function GET(req: Request) {
  try {
    // Extragem parametrii din URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return new NextResponse("Search query is required", { status: 400 });
    }

    // Formatăm termenul de căutare pentru PostgreSQL
    const formattedTerm = formatSearchTerm(query);

    // 🔍 Executăm query-ul raw pentru căutare full-text
    const courses = await db.$queryRaw`
      SELECT * FROM "Course"
      WHERE to_tsvector('english', title || ' ' || coalesce(description, '')) @@ to_tsquery(${formattedTerm})
    `;

    return NextResponse.json(courses);
  } catch (error) {
    console.error("[COURSES_SEARCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
