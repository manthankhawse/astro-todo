import { db, Todo } from "astro:db";

export async function GET(){
  try {
    const result = await db.select().from(Todo).all();

    return new Response(
      JSON.stringify({
        result,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in GET /get-todo:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch todos.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
